/*
  Warnings:

  - Made the column `shortCode` on table `Url` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Url" ALTER COLUMN "shortCode" SET NOT NULL;
