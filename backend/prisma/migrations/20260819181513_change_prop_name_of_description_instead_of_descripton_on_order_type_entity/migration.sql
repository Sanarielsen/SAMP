/*
  Warnings:

  - You are about to drop the column `descripton` on the `order_types` table. All the data in the column will be lost.
  - Added the required column `description` to the `order_types` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "order_types" DROP COLUMN "descripton",
ADD COLUMN     "description" TEXT NOT NULL;
