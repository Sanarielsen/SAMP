/*
  Warnings:

  - You are about to drop the `OrderType` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_orderTypeId_fkey";

-- DropTable
DROP TABLE "OrderType";

-- CreateTable
CREATE TABLE "order_types" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "descripton" TEXT NOT NULL,
    "observation" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "order_types_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_orderTypeId_fkey" FOREIGN KEY ("orderTypeId") REFERENCES "order_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
