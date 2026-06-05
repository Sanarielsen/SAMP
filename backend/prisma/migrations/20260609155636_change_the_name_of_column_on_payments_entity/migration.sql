/*
  Warnings:

  - Added the required column `totalAmountInCents` to the `payments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "payments" ADD COLUMN     "totalAmountInCents" INTEGER NOT NULL;
