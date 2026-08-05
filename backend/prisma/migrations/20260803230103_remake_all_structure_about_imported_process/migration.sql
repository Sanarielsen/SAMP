/*
  Warnings:

  - You are about to drop the column `attorney` on the `imported_processes` table. All the data in the column will be lost.
  - You are about to drop the column `cfe` on the `imported_processes` table. All the data in the column will be lost.
  - You are about to drop the column `depositDate` on the `imported_processes` table. All the data in the column will be lost.
  - You are about to drop the column `dispatchDetails` on the `imported_processes` table. All the data in the column will be lost.
  - You are about to drop the column `importedByUser` on the `imported_processes` table. All the data in the column will be lost.
  - You are about to drop the column `internationalRegistrationNumber` on the `imported_processes` table. All the data in the column will be lost.
  - You are about to drop the column `markName` on the `imported_processes` table. All the data in the column will be lost.
  - You are about to drop the column `ncl` on the `imported_processes` table. All the data in the column will be lost.
  - You are about to drop the column `processCategoryId` on the `imported_processes` table. All the data in the column will be lost.
  - You are about to drop the column `processHistoricId` on the `imported_processes` table. All the data in the column will be lost.
  - You are about to drop the column `processTypeId` on the `imported_processes` table. All the data in the column will be lost.
  - You are about to drop the column `receivedDate` on the `imported_processes` table. All the data in the column will be lost.
  - You are about to drop the column `sourcePage` on the `imported_processes` table. All the data in the column will be lost.
  - You are about to drop the column `sourceText` on the `imported_processes` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `imported_processes` table. All the data in the column will be lost.
  - You are about to drop the column `translatedSpecification` on the `imported_processes` table. All the data in the column will be lost.
  - You are about to drop the column `clientId` on the `publications` table. All the data in the column will be lost.
  - You are about to drop the column `processTypeId` on the `publications` table. All the data in the column will be lost.
  - You are about to drop the `process_categories` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `process_histories` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `process_types` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `brand` to the `imported_processes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `clientId` to the `imported_processes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `processStatus` to the `imported_processes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sourceEntireProcess` to the `imported_processes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAtByMagazine` to the `imported_processes` table without a default value. This is not possible if the table is not empty.
  - Made the column `presentation` on table `imported_processes` required. This step will fail if there are existing NULL values in that column.
  - Made the column `nature` on table `imported_processes` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "imported_processes" DROP CONSTRAINT "imported_processes_importedByUser_fkey";

-- DropForeignKey
ALTER TABLE "imported_processes" DROP CONSTRAINT "imported_processes_processCategoryId_fkey";

-- DropForeignKey
ALTER TABLE "imported_processes" DROP CONSTRAINT "imported_processes_processHistoricId_fkey";

-- DropForeignKey
ALTER TABLE "imported_processes" DROP CONSTRAINT "imported_processes_processTypeId_fkey";

-- DropForeignKey
ALTER TABLE "process_histories" DROP CONSTRAINT "process_histories_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "publications" DROP CONSTRAINT "publications_clientId_fkey";

-- DropForeignKey
ALTER TABLE "publications" DROP CONSTRAINT "publications_processTypeId_fkey";

-- AlterTable
ALTER TABLE "imported_processes" DROP COLUMN "attorney",
DROP COLUMN "cfe",
DROP COLUMN "depositDate",
DROP COLUMN "dispatchDetails",
DROP COLUMN "importedByUser",
DROP COLUMN "internationalRegistrationNumber",
DROP COLUMN "markName",
DROP COLUMN "ncl",
DROP COLUMN "processCategoryId",
DROP COLUMN "processHistoricId",
DROP COLUMN "processTypeId",
DROP COLUMN "receivedDate",
DROP COLUMN "sourcePage",
DROP COLUMN "sourceText",
DROP COLUMN "status",
DROP COLUMN "translatedSpecification",
ADD COLUMN     "brand" TEXT NOT NULL,
ADD COLUMN     "clientId" TEXT NOT NULL,
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "expirationDate" TIMESTAMP(3),
ADD COLUMN     "filingDate" TIMESTAMP(3),
ADD COLUMN     "processStatus" TEXT NOT NULL,
ADD COLUMN     "sourceEntireProcess" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3),
ADD COLUMN     "updatedAtByMagazine" TEXT NOT NULL,
ALTER COLUMN "presentation" SET NOT NULL,
ALTER COLUMN "nature" SET NOT NULL;

-- AlterTable
ALTER TABLE "publications" DROP COLUMN "clientId",
DROP COLUMN "processTypeId";

-- DropTable
DROP TABLE "process_categories";

-- DropTable
DROP TABLE "process_histories";

-- DropTable
DROP TABLE "process_types";

-- AddForeignKey
ALTER TABLE "imported_processes" ADD CONSTRAINT "imported_processes_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "clients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
