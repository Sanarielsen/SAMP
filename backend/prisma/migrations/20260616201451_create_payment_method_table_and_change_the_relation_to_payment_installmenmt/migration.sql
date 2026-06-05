/*
  Warnings:

  - You are about to drop the column `method` on the `payment_installments` table. All the data in the column will be lost.
  - Added the required column `methodId` to the `payment_installments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "payment_installments" DROP COLUMN "method",
ADD COLUMN     "methodId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "payment_methods" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "observation" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "payment_methods_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "payment_installments" ADD CONSTRAINT "payment_installments_methodId_fkey" FOREIGN KEY ("methodId") REFERENCES "payment_methods"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
