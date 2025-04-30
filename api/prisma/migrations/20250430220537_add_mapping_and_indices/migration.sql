/*
  Warnings:

  - The `status` column on the `EVENTS_USERS` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - Changed the type of `role` on the `EVENTS_USERS` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "EventUserRole" AS ENUM ('ORGANIZER', 'PARTICIPANT');

-- CreateEnum
CREATE TYPE "EventUserStatus" AS ENUM ('PENDING', 'ACCEPTED', 'REJECTED');

-- DropForeignKey
ALTER TABLE "EVENTS_USERS" DROP CONSTRAINT "EVENTS_USERS_user_id_fkey";

-- DropForeignKey
ALTER TABLE "EVENT_COMMENTS" DROP CONSTRAINT "EVENT_COMMENTS_user_id_fkey";

-- AlterTable
ALTER TABLE "EVENTS_USERS" DROP COLUMN "role",
ADD COLUMN     "role" "EventUserRole" NOT NULL,
DROP COLUMN "status",
ADD COLUMN     "status" "EventUserStatus" NOT NULL DEFAULT 'PENDING';

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "USERS" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "password" TEXT,
    "picture" TEXT,
    "google_id" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "USERS_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "USERS_email_key" ON "USERS"("email");

-- CreateIndex
CREATE UNIQUE INDEX "USERS_google_id_key" ON "USERS"("google_id");

-- CreateIndex
CREATE INDEX "idx_users_email" ON "USERS"("email");

-- CreateIndex
CREATE INDEX "idx_users_google_id" ON "USERS"("google_id");

-- CreateIndex
CREATE INDEX "idx_events_users_event_id" ON "EVENTS_USERS"("event_id");

-- CreateIndex
CREATE INDEX "idx_events_users_user_id" ON "EVENTS_USERS"("user_id");

-- CreateIndex
CREATE INDEX "idx_event_comments_event_id" ON "EVENT_COMMENTS"("event_id");

-- CreateIndex
CREATE INDEX "idx_event_comments_user_id" ON "EVENT_COMMENTS"("user_id");

-- CreateIndex
CREATE INDEX "idx_event_links_event_id" ON "EVENT_LINKS"("event_id");

-- AddForeignKey
ALTER TABLE "EVENTS_USERS" ADD CONSTRAINT "EVENTS_USERS_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "USERS"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EVENT_COMMENTS" ADD CONSTRAINT "EVENT_COMMENTS_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "USERS"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
