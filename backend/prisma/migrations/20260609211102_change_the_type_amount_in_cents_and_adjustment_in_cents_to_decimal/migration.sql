-- AlterTable
ALTER TABLE "payment_installments" ALTER COLUMN "amountInCents" SET DATA TYPE DECIMAL(65,30),
ALTER COLUMN "adjustmentInCents" SET DATA TYPE DECIMAL(65,30);
