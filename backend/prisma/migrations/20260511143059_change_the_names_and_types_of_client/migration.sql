/*
  Warnings:

  - You are about to drop the column `userCreated` on the `clients` table. All the data in the column will be lost.
  - You are about to drop the column `userResponsable` on the `clients` table. All the data in the column will be lost.
  - Added the required column `createdByUser` to the `clients` table without a default value. This is not possible if the table is not empty.
  - Added the required column `responsableId` to the `clients` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "clients" DROP CONSTRAINT "clients_userCreated_fkey";

-- DropForeignKey
ALTER TABLE "clients" DROP CONSTRAINT "clients_userResponsable_fkey";

-- AlterTable
ALTER TABLE "clients" DROP COLUMN "userCreated",
DROP COLUMN "userResponsable",
ADD COLUMN     "createdByUser" TEXT NOT NULL,
ADD COLUMN     "responsableId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "clients" ADD CONSTRAINT "clients_createdByUser_fkey" FOREIGN KEY ("createdByUser") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "clients" ADD CONSTRAINT "clients_responsableId_fkey" FOREIGN KEY ("responsableId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
