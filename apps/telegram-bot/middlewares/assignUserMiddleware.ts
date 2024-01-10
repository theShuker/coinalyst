import { upsertTelegramUser } from '@coinalyst/services/UserService';
import { CoinalystTelegrafContext } from './../bot.d';

export default async function assignUserMiddleware(
  ctx: CoinalystTelegrafContext,
  next: () => Promise<void>
) {
  try {
    if (!ctx.from) throw new Error('ctx.from is undefined');
    //upsert does db update of user name+nickname or creates new one if none found
    ctx.user = await upsertTelegramUser(ctx.from);

    await next();
  } catch (error) {
    console.error(error);
  }
}
