import { CoinalystTelegrafContext } from './bot';
import { Telegraf } from 'telegraf';
import 'dotenv/config';
import transactionMsgHandler, { transactionMsgRegex } from './transactionMsgHandler';
import { prisma } from '@coinalyst/prisma-main-db';
import assignUserMiddleware from './middlewares/assignUserMiddleware';

if (!process.env.BOT_TOKEN) throw new Error('No token specified in .env');
const bot = new Telegraf<CoinalystTelegrafContext>(process.env.BOT_TOKEN);

//middleware to assign current user to the context
bot.use(assignUserMiddleware);

bot.start(async (ctx) => {
  ctx.reply(`Добро пожаловать в Coinalyst${ctx.user?.name && `, ${ctx.user.name}`}!`);
});

bot.hears(transactionMsgRegex, transactionMsgHandler);

bot.command('stats', async (ctx) => {
  if (!ctx.user) return;

  const now = new Date();
  const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const lastDayOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

  const result: { transactionCount: BigInt; totalAmount: BigInt }[] = await prisma.$queryRaw`
    SELECT
      COUNT(*) as "transactionCount",
      SUM(amount) as "totalAmount"
    FROM
      "Transaction"
    WHERE
      "userId" = ${ctx.user.id}
      AND date >= ${firstDayOfMonth}
      AND date <= ${lastDayOfMonth};
  `;

  console.log(result);

  if (!result.length) return ctx.reply('Похоже у вас не было трат в этом месяце');

  const data = result[0];

  console.log(data);

  ctx.reply(`Статистика за период с ${firstDayOfMonth.toLocaleDateString()} по ${lastDayOfMonth.toLocaleDateString()}
    Расходы: ${data.totalAmount}
    Количество трат: ${data.transactionCount}`);
});

bot.launch({
  //dropPendingUpdates: process.env.ENVIROMENT === 'development' || false,
});

console.log('Bot running...');

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
