import { prisma } from '@coinalyst/prisma-main-db';
import { TransactionType, TransactionCategory} from '@prisma/client';


interface IGetUserTransactionsProps {
  limit?: number;
}

export async function getUserTransactions({ limit = 10 }: IGetUserTransactionsProps) {
  return await prisma.transaction.findMany({
    take: limit,
    orderBy: { createdAt: 'desc' },
    include: {
      transactionCategories: true,
    },
  });
}


interface ICreateTransactionProps {
  amount: number;
  date?: Date;
  transactionType: TransactionType;
  description: string;
  userId: number;
  transactionCategories: TransactionCategory[];
}

export async function createTransaction({
  amount,
  date,
  transactionType,
  description,
  userId,
  transactionCategories,
}: ICreateTransactionProps) {
  return await prisma.transaction.create({
    data: {
      amount,
      date,
      transactionType,
      description,
      user: {
        connect: {
          id: userId,
        },
      },
      transactionCategories: {
        connect: transactionCategories.map((cat) => ({ id: cat.id })),
      },
    },
  });
}



interface IGetUserTransactionCategoriesProps {
  limit?: number;
}

//@todo get only users catss
export async function getUserTransactionCategories({ limit }: IGetUserTransactionCategoriesProps) {
  return await prisma.transactionCategory.findMany({
    take: limit,
    orderBy: { title: 'asc' },
    include: {
      transactions: true,
    },
  });
}