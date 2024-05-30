/*
  Warnings:

  - You are about to drop the `pic` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "plant" ADD COLUMN "image" TEXT;

-- AlterTable
ALTER TABLE "tip" ADD COLUMN "image" TEXT;

-- AlterTable
ALTER TABLE "user" ADD COLUMN "image" TEXT;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "pic";
PRAGMA foreign_keys=on;
