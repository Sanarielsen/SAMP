/*
  Warnings:

  - You are about to drop the column `nationality` on the `Representatives` table. All the data in the column will be lost.
  - Added the required column `nacionality` to the `Representatives` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Representatives" DROP COLUMN "nationality",
ADD COLUMN     "nacionality" TEXT NOT NULL;
