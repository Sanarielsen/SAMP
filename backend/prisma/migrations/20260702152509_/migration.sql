/*
  Warnings:

  - A unique constraint covering the columns `[numberMagazine]` on the table `process_historics` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "process_historics_numberMagazine_key" ON "process_historics"("numberMagazine");
