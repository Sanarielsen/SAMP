/*
  Warnings:

  - Added the required column `publishDate` to the `processes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "processes" ADD COLUMN     "dueDate" TIMESTAMP(3),
ADD COLUMN     "grantingDate" TIMESTAMP(3),
ADD COLUMN     "publishDate" TIMESTAMP(3) NOT NULL;
