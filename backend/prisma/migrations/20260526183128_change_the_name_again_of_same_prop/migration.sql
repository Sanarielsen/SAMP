/*
  Warnings:

  - You are about to drop the column `date` on the `orders` table. All the data in the column will be lost.
  - Added the required column `eventDate` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "orders" DROP COLUMN "date",
ADD COLUMN     "eventDate" TIMESTAMP(3) NOT NULL;
