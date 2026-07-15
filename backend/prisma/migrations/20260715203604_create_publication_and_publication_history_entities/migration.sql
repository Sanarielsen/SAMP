-- CreateTable
CREATE TABLE "publications" (
    "id" TEXT NOT NULL,
    "processHistoryId" TEXT NOT NULL,
    "processTypeId" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "processNumber" TEXT NOT NULL,
    "holder" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "nature" TEXT NOT NULL,
    "specification" TEXT NOT NULL,
    "publicationDate" TIMESTAMP(3),
    "depositDate" TIMESTAMP(3),
    "grantDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "publications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PublicationHistories" (
    "id" TEXT NOT NULL,
    "processHistoryId" TEXT NOT NULL,
    "processBrandPublicationId" TEXT NOT NULL,
    "processNumber" TEXT NOT NULL,
    "dispatch" TEXT NOT NULL,
    "complement" TEXT NOT NULL,
    "publicationDate" TIMESTAMP(3) NOT NULL,
    "providence" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "PublicationHistories_pkey" PRIMARY KEY ("id")
);
