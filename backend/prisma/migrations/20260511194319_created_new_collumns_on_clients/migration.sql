/*
  Warnings:

  - You are about to drop the column `name` on the `clients` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `clients` table. All the data in the column will be lost.
  - Added the required column `correspondenceAddress` to the `clients` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createdById` to the `clients` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isActivated` to the `clients` table without a default value. This is not possible if the table is not empty.
  - Added the required column `legalName` to the `clients` table without a default value. This is not possible if the table is not empty.
  - Added the required column `locationAddress` to the `clients` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nameContact` to the `clients` table without a default value. This is not possible if the table is not empty.
  - Added the required column `numberContact` to the `clients` table without a default value. This is not possible if the table is not empty.
  - Added the required column `responsibleById` to the `clients` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `type` on the `clients` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "clients" DROP CONSTRAINT "clients_userId_fkey";

-- AlterTable
ALTER TABLE "clients" DROP COLUMN "name",
DROP COLUMN "userId",
ADD COLUMN     "correspondenceAddress" TEXT NOT NULL,
ADD COLUMN     "createdById" TEXT NOT NULL,
ADD COLUMN     "isActivated" BOOLEAN NOT NULL,
ADD COLUMN     "legalName" TEXT NOT NULL,
ADD COLUMN     "locationAddress" TEXT NOT NULL,
ADD COLUMN     "nameContact" TEXT NOT NULL,
ADD COLUMN     "numberContact" TEXT NOT NULL,
ADD COLUMN     "responsibleById" TEXT NOT NULL,
DROP COLUMN "type",
ADD COLUMN     "type" INTEGER NOT NULL,
ALTER COLUMN "updatedAt" DROP NOT NULL,
ALTER COLUMN "updatedAt" DROP DEFAULT;

-- AddForeignKey
ALTER TABLE "clients" ADD CONSTRAINT "clients_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "clients" ADD CONSTRAINT "clients_responsibleById_fkey" FOREIGN KEY ("responsibleById") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
