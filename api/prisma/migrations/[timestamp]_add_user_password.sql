-- AlterTable
ALTER TABLE "User" ADD COLUMN "password" TEXT;
-- UpdateData
UPDATE "User" SET "password" = '$2b$10$defaultpasswordhash' WHERE "password" IS NULL;
-- MakeRequired
ALTER TABLE "User" ALTER COLUMN "password" SET NOT NULL;
