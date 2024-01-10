/*
  Warnings:

  - You are about to drop the column `transactionCategoryId` on the `Transaction` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_transactionCategoryId_fkey";

-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "transactionCategoryId";

-- CreateTable
CREATE TABLE "_TransactionToTransactionCategory" (
    "A" TEXT NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_TransactionToTransactionCategory_AB_unique" ON "_TransactionToTransactionCategory"("A", "B");

-- CreateIndex
CREATE INDEX "_TransactionToTransactionCategory_B_index" ON "_TransactionToTransactionCategory"("B");

-- AddForeignKey
ALTER TABLE "_TransactionToTransactionCategory" ADD CONSTRAINT "_TransactionToTransactionCategory_A_fkey" FOREIGN KEY ("A") REFERENCES "Transaction"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TransactionToTransactionCategory" ADD CONSTRAINT "_TransactionToTransactionCategory_B_fkey" FOREIGN KEY ("B") REFERENCES "TransactionCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;
