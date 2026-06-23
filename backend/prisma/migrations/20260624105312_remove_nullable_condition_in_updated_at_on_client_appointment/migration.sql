/*
  Warnings:

  - Made the column `updatedAt` on table `client_appointments` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "client_appointments" ALTER COLUMN "updatedAt" SET NOT NULL;
