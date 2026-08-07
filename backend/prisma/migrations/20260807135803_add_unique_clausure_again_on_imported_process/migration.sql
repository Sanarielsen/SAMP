/*
  Warnings:

  - A unique constraint covering the columns `[processNumber]` on the table `imported_processes` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "imported_processes_processNumber_key" ON "imported_processes"("processNumber");
