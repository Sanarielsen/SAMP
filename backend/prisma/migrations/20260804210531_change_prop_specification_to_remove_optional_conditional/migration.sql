/*
  Warnings:

  - Made the column `specification` on table `imported_processes` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "imported_processes" ALTER COLUMN "specification" SET NOT NULL;
