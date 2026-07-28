/*
  Warnings:

  - You are about to drop the `PublicationHistories` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `client_processes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `publications` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `createdByUser` to the `imported_processes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedByUser` to the `imported_processes` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "client_processes" DROP CONSTRAINT "client_processes_clientId_fkey";

-- AlterTable
ALTER TABLE "imported_processes" ADD COLUMN     "createdByUser" TEXT NOT NULL,
ADD COLUMN     "updatedByUser" TEXT NOT NULL;

-- DropTable
DROP TABLE "PublicationHistories";

-- DropTable
DROP TABLE "client_processes";

-- DropTable
DROP TABLE "publications";

-- AddForeignKey
ALTER TABLE "imported_processes" ADD CONSTRAINT "imported_processes_createdByUser_fkey" FOREIGN KEY ("createdByUser") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "imported_processes" ADD CONSTRAINT "imported_processes_updatedByUser_fkey" FOREIGN KEY ("updatedByUser") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
