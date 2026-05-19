/*
  Warnings:

  - You are about to drop the column `nacionality` on the `Representatives` table. All the data in the column will be lost.
  - Added the required column `nationality` to the `Representatives` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Representatives" DROP COLUMN "nacionality",
ADD COLUMN     "nationality" TEXT NOT NULL;
