/*
  Warnings:

  - You are about to drop the column `clientId` on the `Representatives` table. All the data in the column will be lost.
  - Added the required column `clientId` to the `Representatives` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Representatives" DROP CONSTRAINT "Representatives_idClient_fkey";

-- AlterTable
ALTER TABLE "Representatives" DROP COLUMN "clientId",
ADD COLUMN     "clientId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Representatives" ADD CONSTRAINT "Representatives_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "clients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
