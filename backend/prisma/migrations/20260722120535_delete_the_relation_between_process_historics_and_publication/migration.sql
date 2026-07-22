/*
  Warnings:

  - You are about to drop the column `processHistoryId` on the `publications` table. All the data in the column will be lost.
  - You are about to drop the `process_historics` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "imported_processes" DROP CONSTRAINT "imported_processes_processHistoricId_fkey";

-- DropForeignKey
ALTER TABLE "process_historics" DROP CONSTRAINT "process_historics_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "publications" DROP CONSTRAINT "publications_processHistoryId_fkey";

-- AlterTable
ALTER TABLE "publications" DROP COLUMN "processHistoryId";

-- DropTable
DROP TABLE "process_historics";

-- CreateTable
CREATE TABLE "process_histories" (
    "id" TEXT NOT NULL,
    "numberMagazine" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "fileName" TEXT NOT NULL,
    "filePath" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "process_histories_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "process_histories_numberMagazine_key" ON "process_histories"("numberMagazine");

-- AddForeignKey
ALTER TABLE "process_histories" ADD CONSTRAINT "process_histories_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "process_categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "imported_processes" ADD CONSTRAINT "imported_processes_processHistoricId_fkey" FOREIGN KEY ("processHistoricId") REFERENCES "process_histories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
