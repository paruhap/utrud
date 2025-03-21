-- CreateTable
CREATE TABLE "Content" (
    "id" SERIAL NOT NULL,
    "block" TEXT,
    "title" TEXT NOT NULL,
    "subtitle" TEXT,
    "text" TEXT,
    "subtext" TEXT,
    "link" TEXT,
    "link2" TEXT,

    CONSTRAINT "Content_pkey" PRIMARY KEY ("id")
);
