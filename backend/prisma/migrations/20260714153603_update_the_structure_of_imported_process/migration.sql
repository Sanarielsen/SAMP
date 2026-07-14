/*
  Warnings:

  - You are about to drop the column `brand` on the `imported_processes` table. All the data in the column will be lost.
  - You are about to drop the column `deletedAt` on the `imported_processes` table. All the data in the column will be lost.
  - You are about to drop the column `dispatchDescription` on the `imported_processes` table. All the data in the column will be lost.
  - You are about to drop the column `dueDate` on the `imported_processes` table. All the data in the column will be lost.
  - You are about to drop the column `grantingDate` on the `imported_processes` table. All the data in the column will be lost.
  - You are about to drop the column `internationalRegistration` on the `imported_processes` table. All the data in the column will be lost.
  - You are about to drop the column `nominativeElement` on the `imported_processes` table. All the data in the column will be lost.
  - You are about to drop the column `publishDate` on the `imported_processes` table. All the data in the column will be lost.
  - You are about to drop the column `receiptDate` on the `imported_processes` table. All the data in the column will be lost.
  - You are about to drop the column `sourceFile` on the `imported_processes` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `imported_processes` table. All the data in the column will be lost.
  - You are about to drop the column `titular` on the `imported_processes` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `imported_processes` table. All the data in the column will be lost.
  - Added the required column `dispatchDetails` to the `imported_processes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `holder` to the `imported_processes` table without a default value. This is not possible if the table is not empty.
  - Made the column `processTypeId` on table `imported_processes` required. This step will fail if there are existing NULL values in that column.
  - Made the column `depositDate` on table `imported_processes` required. This step will fail if there are existing NULL values in that column.
  - Made the column `sourceText` on table `imported_processes` required. This step will fail if there are existing NULL values in that column.
  - Made the column `sourcePage` on table `imported_processes` required. This step will fail if there are existing NULL values in that column.
  - Made the column `status` on table `imported_processes` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "imported_processes" DROP CONSTRAINT "imported_processes_processTypeId_fkey";

-- AlterTable
ALTER TABLE "imported_processes" DROP COLUMN "brand",
DROP COLUMN "deletedAt",
DROP COLUMN "dispatchDescription",
DROP COLUMN "dueDate",
DROP COLUMN "grantingDate",
DROP COLUMN "internationalRegistration",
DROP COLUMN "nominativeElement",
DROP COLUMN "publishDate",
DROP COLUMN "receiptDate",
DROP COLUMN "sourceFile",
DROP COLUMN "title",
DROP COLUMN "titular",
DROP COLUMN "updatedAt",
ADD COLUMN     "attorney" TEXT,
ADD COLUMN     "cfe" TEXT,
ADD COLUMN     "dispatchDetails" TEXT NOT NULL,
ADD COLUMN     "grantDate" TIMESTAMP(3),
ADD COLUMN     "holder" TEXT NOT NULL,
ADD COLUMN     "internationalRegistrationNumber" TEXT,
ADD COLUMN     "markName" TEXT,
ADD COLUMN     "receivedDate" TIMESTAMP(3),
ADD COLUMN     "translatedSpecification" TEXT,
ALTER COLUMN "processTypeId" SET NOT NULL,
ALTER COLUMN "depositDate" SET NOT NULL,
ALTER COLUMN "sourceText" SET NOT NULL,
ALTER COLUMN "sourcePage" SET NOT NULL,
ALTER COLUMN "status" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "imported_processes" ADD CONSTRAINT "imported_processes_processTypeId_fkey" FOREIGN KEY ("processTypeId") REFERENCES "process_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
