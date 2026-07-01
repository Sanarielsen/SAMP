/*
  Warnings:

  - You are about to drop the column `processId` on the `client_processes` table. All the data in the column will be lost.
  - You are about to drop the `processes` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `processNumber` to the `client_processes` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "client_processes" DROP CONSTRAINT "client_processes_processId_fkey";

-- DropForeignKey
ALTER TABLE "processes" DROP CONSTRAINT "processes_processTypeId_fkey";

-- DropIndex
DROP INDEX "client_processes_clientId_processId_key";

-- AlterTable
ALTER TABLE "client_processes" DROP COLUMN "processId",
ADD COLUMN     "processNumber" TEXT NOT NULL;

-- DropTable
DROP TABLE "processes";

-- CreateTable
CREATE TABLE "imported_processes" (
    "id" TEXT NOT NULL,
    "processCategoryId" TEXT NOT NULL,
    "processTypeId" TEXT,
    "processNumber" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "titular" TEXT,
    "dispatchDescription" TEXT,
    "brand" TEXT,
    "depositDate" TIMESTAMP(3),
    "receiptDate" TIMESTAMP(3),
    "dueDate" TIMESTAMP(3),
    "publishDate" TIMESTAMP(3),
    "grantingDate" TIMESTAMP(3),
    "internationalRegistration" TEXT,
    "presentation" TEXT,
    "nature" TEXT,
    "nominativeElement" TEXT,
    "ncl" TEXT,
    "specification" TEXT,
    "sourceText" TEXT,
    "sourceFile" TEXT,
    "sourcePage" INTEGER,
    "status" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "imported_processes_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "imported_processes" ADD CONSTRAINT "imported_processes_processCategoryId_fkey" FOREIGN KEY ("processCategoryId") REFERENCES "process_categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "imported_processes" ADD CONSTRAINT "imported_processes_processTypeId_fkey" FOREIGN KEY ("processTypeId") REFERENCES "process_types"("id") ON DELETE SET NULL ON UPDATE CASCADE;
