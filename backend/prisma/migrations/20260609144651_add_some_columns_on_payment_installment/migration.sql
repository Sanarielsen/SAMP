/*
  Warnings:

  - You are about to drop the column `checkedAt` on the `payment_installments` table. All the data in the column will be lost.
  - Added the required column `dueDate` to the `payment_installments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "payment_installments" DROP COLUMN "checkedAt",
ADD COLUMN     "dueDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "paidAt" TIMESTAMP(3);
