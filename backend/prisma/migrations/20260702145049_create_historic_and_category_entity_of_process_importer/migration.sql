-- CreateTable
CREATE TABLE "process_categories" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "process_categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "process_historics" (
    "id" TEXT NOT NULL,
    "numberMagazine" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "fileName" TEXT NOT NULL,
    "filrPath" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "process_historics_pkey" PRIMARY KEY ("id")
);
