/*
  Warnings:

  - You are about to drop the column `name` on the `clients` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `clients` table. All the data in the column will be lost.
  - Added the required column `correspondenceAddress` to the `clients` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isActivated` to the `clients` table without a default value. This is not possible if the table is not empty.
  - Added the required column `legalName` to the `clients` table without a default value. This is not possible if the table is not empty.
  - Added the required column `locationAddress` to the `clients` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nameContact` to the `clients` table without a default value. This is not possible if the table is not empty.
  - Added the required column `numberContact` to the `clients` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userCreated` to the `clients` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userResponsable` to the `clients` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "clients" DROP CONSTRAINT "clients_userId_fkey";

-- AlterTable
ALTER TABLE "clients" DROP COLUMN "name",
DROP COLUMN "userId",
ADD COLUMN     "correspondenceAddress" TEXT NOT NULL,
ADD COLUMN     "isActivated" BOOLEAN NOT NULL,
ADD COLUMN     "legalName" TEXT NOT NULL,
ADD COLUMN     "locationAddress" TEXT NOT NULL,
ADD COLUMN     "nameContact" TEXT NOT NULL,
ADD COLUMN     "numberContact" TEXT NOT NULL,
ADD COLUMN     "userCreated" TEXT NOT NULL,
ADD COLUMN     "userResponsable" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "clients" ADD CONSTRAINT "clients_userCreated_fkey" FOREIGN KEY ("userCreated") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "clients" ADD CONSTRAINT "clients_userResponsable_fkey" FOREIGN KEY ("userResponsable") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
