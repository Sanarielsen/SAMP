/*
  Warnings:

  - Added the required column `order` to the `payment_methods` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "payment_methods" ADD COLUMN     "order" INTEGER NOT NULL;
