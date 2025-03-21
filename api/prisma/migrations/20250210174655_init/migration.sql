-- CreateTable
CREATE TABLE "Services" (
    "id" SERIAL NOT NULL,
    "category" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "text" TEXT,
    "price" TEXT NOT NULL,
    "link" TEXT,

    CONSTRAINT "Services_pkey" PRIMARY KEY ("id")
);
