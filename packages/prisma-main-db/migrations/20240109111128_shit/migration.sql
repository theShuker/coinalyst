-- CreateTable
CREATE TABLE "TransactionCategoryWord" (
    "id" SERIAL NOT NULL,
    "word" TEXT NOT NULL,
    "transactionCategoryId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TransactionCategoryWord_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TransactionCategoryWord" ADD CONSTRAINT "TransactionCategoryWord_transactionCategoryId_fkey" FOREIGN KEY ("transactionCategoryId") REFERENCES "TransactionCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
