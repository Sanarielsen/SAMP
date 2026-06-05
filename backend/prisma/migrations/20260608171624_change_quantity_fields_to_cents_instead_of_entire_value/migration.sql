/*
  Warnings:

  - You are about to drop the column `adjustment` on the `payments` table. All the data in the column will be lost.
  - You are about to drop the column `quantity` on the `payments` table. All the data in the column will be lost.
  - Added the required column `amountInCents` to the `payments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "payments" DROP COLUMN "adjustment",
DROP COLUMN "quantity",
ADD COLUMN     "adjustmentInCents" INTEGER,
ADD COLUMN     "amountInCents" INTEGER NOT NULL;
