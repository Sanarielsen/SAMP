/*
  Warnings:

  - You are about to drop the column `filrPath` on the `process_historics` table. All the data in the column will be lost.
  - Added the required column `filePath` to the `process_historics` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "process_historics" DROP COLUMN "filrPath",
ADD COLUMN     "filePath" TEXT NOT NULL;
