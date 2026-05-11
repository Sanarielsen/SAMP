/*
  Warnings:

  - A unique constraint covering the columns `[protocol]` on the table `clients` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "clients_protocol_key" ON "clients"("protocol");
