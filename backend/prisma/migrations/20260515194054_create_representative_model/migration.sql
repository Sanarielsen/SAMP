-- CreateTable
CREATE TABLE "Representatives" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "nationality" TEXT NOT NULL,
    "documentRG" TEXT NOT NULL,
    "documentCPF" TEXT NOT NULL,
    "titleJob" TEXT NOT NULL,
    "roleJob" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "clientId" TEXT NOT NULL,

    CONSTRAINT "Representatives_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Representatives" ADD CONSTRAINT "Representatives_idClient_fkey" FOREIGN KEY ("clientId") REFERENCES "clients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
