-- CreateTable
CREATE TABLE "process_publications" (
    "id" TEXT NOT NULL,
    "importedProcessId" TEXT NOT NULL,
    "processMagazine" TEXT NOT NULL,
    "publicationDate" TEXT NOT NULL,
    "dispatch" TEXT NOT NULL,
    "certificate" TEXT,
    "description" TEXT,
    "complement" TEXT,
    "createdByUser" TEXT NOT NULL,
    "updatedByUser" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "process_publications_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "process_publications" ADD CONSTRAINT "process_publications_createdByUser_fkey" FOREIGN KEY ("createdByUser") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "process_publications" ADD CONSTRAINT "process_publications_updatedByUser_fkey" FOREIGN KEY ("updatedByUser") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "process_publications" ADD CONSTRAINT "process_publications_importedProcessId_fkey" FOREIGN KEY ("importedProcessId") REFERENCES "imported_processes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
