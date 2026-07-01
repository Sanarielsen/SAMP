-- CreateTable
CREATE TABLE "process_types" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "process_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "processes" (
    "id" TEXT NOT NULL,
    "processTypeId" TEXT,
    "processNumber" TEXT,
    "title" TEXT NOT NULL,
    "titular" TEXT,
    "dispatchDescription" TEXT,
    "depositDate" TIMESTAMP(3),
    "receiptDate" TIMESTAMP(3),
    "internationalRegistration" TEXT,
    "presentation" TEXT,
    "nature" TEXT,
    "nominativeElement" TEXT,
    "ncl" TEXT,
    "specification" TEXT,
    "sourceText" TEXT,
    "sourceFile" TEXT,
    "sourcePage" INTEGER,
    "status" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "processes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "client_processes" (
    "id" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "processId" TEXT NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "notes" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "client_processes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "process_types_slug_key" ON "process_types"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "client_processes_clientId_processId_key" ON "client_processes"("clientId", "processId");

-- AddForeignKey
ALTER TABLE "processes" ADD CONSTRAINT "processes_processTypeId_fkey" FOREIGN KEY ("processTypeId") REFERENCES "process_types"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "client_processes" ADD CONSTRAINT "client_processes_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "clients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "client_processes" ADD CONSTRAINT "client_processes_processId_fkey" FOREIGN KEY ("processId") REFERENCES "processes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
