import { prisma } from '@coinalyst/prisma-main-db';
import { User as TelegramUser } from 'telegraf/typings/core/types/typegram';


export async function upsertTelegramUser(user: TelegramUser) {
  if (user.is_bot) throw new Error('user is bot, gtfo!');

  //upsert w/o update works like findOrCreate
  return await prisma.user.upsert({
    where: { telegramId: user.id },
    update: {
      name: user.first_name,
      username: user.username,
    },
    create: {
      telegramId: user.id,
      name: user.first_name,
      username: user.username,
    },
  });
}