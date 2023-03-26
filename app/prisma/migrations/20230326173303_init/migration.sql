/*
  Warnings:

  - Added the required column `image` to the `contacts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "contacts" ADD COLUMN     "image" TEXT NOT NULL;
