/*
  Warnings:

  - You are about to drop the column `createAt` on the `Ticket` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Ticket" RENAME COLUMN "createAt" TO "createdAt";