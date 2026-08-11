/*
  Warnings:

  - You are about to drop the column `specification` on the `imported_processes` table. All the data in the column will be lost.
  - Added the required column `niceSpecification` to the `imported_processes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `niceStatus` to the `imported_processes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `niceTitle` to the `imported_processes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "imported_processes" DROP COLUMN "specification",
ADD COLUMN     "niceSpecification" TEXT NOT NULL,
ADD COLUMN     "niceStatus" TEXT NOT NULL,
ADD COLUMN     "niceTitle" TEXT NOT NULL;
