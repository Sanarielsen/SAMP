/*
  Warnings:

  - You are about to drop the column `userId` on the `client_appointments` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "client_appointments" DROP CONSTRAINT "client_appointments_userId_fkey";

-- AlterTable
ALTER TABLE "client_appointments" DROP COLUMN "userId";
