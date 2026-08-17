/*
  Warnings:

  - The primary key for the `payment_methods` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `payment_methods` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `methodId` on the `payment_installments` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "payment_installments" DROP CONSTRAINT "payment_installments_methodId_fkey";

-- AlterTable
ALTER TABLE "payment_installments" DROP COLUMN "methodId",
ADD COLUMN     "methodId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "payment_methods" DROP CONSTRAINT "payment_methods_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "payment_methods_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "payment_installments" ADD CONSTRAINT "payment_installments_methodId_fkey" FOREIGN KEY ("methodId") REFERENCES "payment_methods"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
