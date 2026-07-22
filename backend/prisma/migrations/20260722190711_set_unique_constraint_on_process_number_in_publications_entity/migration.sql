/*
  Warnings:

  - A unique constraint covering the columns `[processNumber]` on the table `publications` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "publications_processNumber_key" ON "publications"("processNumber");
