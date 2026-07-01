-- AddForeignKey
ALTER TABLE "process_historics" ADD CONSTRAINT "process_historics_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "process_categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
