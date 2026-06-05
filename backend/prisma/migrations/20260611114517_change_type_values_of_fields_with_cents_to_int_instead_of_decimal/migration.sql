/*
  Warnings:

  - You are about to alter the column `amountInCents` on the `payment_installments` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Integer`.
  - You are about to alter the column `adjustmentInCents` on the `payment_installments` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Integer`.
  - You are about to alter the column `totalAmountInCents` on the `payments` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Integer`.

*/
-- AlterTable
ALTER TABLE "payment_installments" ALTER COLUMN "amountInCents" SET DATA TYPE INTEGER,
ALTER COLUMN "adjustmentInCents" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "payments" ALTER COLUMN "totalAmountInCents" SET DATA TYPE INTEGER;
