/*
  Warnings:

  - You are about to alter the column `title` on the `EVENTS` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to alter the column `address` on the `EVENTS` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to alter the column `link` on the `EVENT_LINKS` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(250)`.
  - You are about to alter the column `title` on the `EVENT_LINKS` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.

*/
-- AlterTable
ALTER TABLE "EVENTS" ALTER COLUMN "title" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "address" SET DATA TYPE VARCHAR(100);

-- AlterTable
ALTER TABLE "EVENT_LINKS" ALTER COLUMN "link" SET DATA TYPE VARCHAR(250),
ALTER COLUMN "title" SET DATA TYPE VARCHAR(100);
