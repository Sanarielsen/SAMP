/*
  Warnings:

  - Added the required column `processHistoricId` to the `imported_processes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "imported_processes" ADD COLUMN     "processHistoricId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "imported_processes" ADD CONSTRAINT "imported_processes_processHistoricId_fkey" FOREIGN KEY ("processHistoricId") REFERENCES "process_historics"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
