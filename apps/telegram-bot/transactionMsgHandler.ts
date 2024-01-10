import { TransactionCategory } from '@prisma/client';
import { TransactionType } from '@prisma/client';
import { CoinalystTelegrafContext } from './bot.d';
import { createTransaction } from '@coinalyst/services/TransactionService';
import parseDate from './parsers/parseDate';
import parseCategories from './parsers/parseCategories';
export const transactionMsgRegex = /^(\+?\d+)\s*(.*)$/i;

const transactionMsgHandler = async (ctx: CoinalystTelegrafContext) => {
  if (!ctx.user || !ctx.message) return console.log(`no user in context or no message`);

  //@TODO: figure out fucking typing
  //@ts-ignore
  const match = transactionMsgRegex.exec(ctx.message.text);
  if (!match) return;

  const amountCaptured = match[1];

  //lets find out transaction type, if number got + infront of it, then its an income, if its just a regular number then its a payment
  const transactionType = amountCaptured.includes('+')
    ? TransactionType.INCOME
    : TransactionType.PAYMENT;

  const amount = Number(amountCaptured);

  const description = match[2];

  const date = parseDate(description);

  const [transactionCategories] = await parseCategories(description);

  const newTransactionData = {
    amount,
    date,
    transactionType,
    description,
    userId: ctx.user.id,
    transactionCategories,
  };

  console.log(newTransactionData);

  const created = await createTransaction(newTransactionData);

  ctx.reply(`✅ ${
    transactionType === TransactionType.PAYMENT ? 'Записал трату' : 'Записал пополнение'
  }
  Сумма: ${amount}
  ${description && `Описание: ${description}`}
  ${
    transactionCategories &&
    `Категории: ${transactionCategories
      .flatMap((cat) => `#${cat.title.toLowerCase().replaceAll(' ', '_')}`)
      .join(', ')}`
  }
  ${date && `Дата: ${date.toLocaleDateString('ru-RU')}`}`);
};

export default transactionMsgHandler;
