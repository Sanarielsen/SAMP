/*
  Warnings:

  - You are about to drop the column `processMagazine` on the `process_publications` table. All the data in the column will be lost.
  - Added the required column `magazineNumber` to the `process_publications` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "process_publications" DROP COLUMN "processMagazine",
ADD COLUMN     "magazineNumber" TEXT NOT NULL;
