/*
  Warnings:

  - You are about to drop the column `sourceEntireProcess` on the `imported_processes` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAtByMagazine` on the `imported_processes` table. All the data in the column will be lost.
  - Added the required column `processMagazine` to the `imported_processes` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "imported_processes_processNumber_key";

-- AlterTable
ALTER TABLE "imported_processes" DROP COLUMN "sourceEntireProcess",
DROP COLUMN "updatedAtByMagazine",
ADD COLUMN     "processMagazine" TEXT NOT NULL;
