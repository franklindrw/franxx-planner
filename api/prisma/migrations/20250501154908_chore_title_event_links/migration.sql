/*
  Warnings:

  - Added the required column `title` to the `EVENT_LINKS` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "EVENT_LINKS" ADD COLUMN     "title" TEXT NOT NULL;
