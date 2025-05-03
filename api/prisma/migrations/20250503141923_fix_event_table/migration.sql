/*
  Warnings:

  - You are about to drop the column `time_in_seconds` on the `EVENTS` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "EVENTS" DROP COLUMN "time_in_seconds",
ADD COLUMN     "time" VARCHAR(10);
