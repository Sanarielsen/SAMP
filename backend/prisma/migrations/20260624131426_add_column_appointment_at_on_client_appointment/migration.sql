/*
  Warnings:

  - Added the required column `appointmentAt` to the `client_appointments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "client_appointments" ADD COLUMN     "appointmentAt" TIMESTAMP(3) NOT NULL;
