/*
  Warnings:

  - You are about to alter the column `time` on the `EVENTS` table. The data in that column could be lost. The data in that column will be cast from `VarChar(10)` to `VarChar(5)`.

*/
-- AlterTable
ALTER TABLE "EVENTS" ALTER COLUMN "time" SET DATA TYPE VARCHAR(5);
