/*
  Warnings:

  - Added the required column `importedByUser` to the `imported_processes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "imported_processes" ADD COLUMN     "importedByUser" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "imported_processes" ADD CONSTRAINT "imported_processes_importedByUser_fkey" FOREIGN KEY ("importedByUser") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
