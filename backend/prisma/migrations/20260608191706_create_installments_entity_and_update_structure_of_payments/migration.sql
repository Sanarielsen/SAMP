/*
  Warnings:

  - You are about to drop the column `adjustmentInCents` on the `payments` table. All the data in the column will be lost.
  - You are about to drop the column `amountInCents` on the `payments` table. All the data in the column will be lost.
  - You are about to drop the column `installment` on the `payments` table. All the data in the column will be lost.
  - You are about to drop the column `method` on the `payments` table. All the data in the column will be lost.
  - Added the required column `totalInstallments` to the `payments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "payments" DROP COLUMN "adjustmentInCents",
DROP COLUMN "amountInCents",
DROP COLUMN "installment",
DROP COLUMN "method",
ADD COLUMN     "totalInstallments" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "payment_installments" (
    "id" TEXT NOT NULL,
    "paymentId" TEXT NOT NULL,
    "amountInCents" INTEGER NOT NULL,
    "method" TEXT NOT NULL,
    "installment" INTEGER NOT NULL,
    "adjustmentInCents" INTEGER,
    "observation" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "payment_installments_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "payment_installments" ADD CONSTRAINT "payment_installments_paymentId_fkey" FOREIGN KEY ("paymentId") REFERENCES "payments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
