/*
  Warnings:

  - You are about to drop the `plant_guard` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "plant_guard";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "plant_guardian" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "from" DATETIME NOT NULL,
    "to" DATETIME NOT NULL,
    "plantId" INTEGER NOT NULL,
    "guardId" INTEGER NOT NULL,
    CONSTRAINT "plant_guardian_plantId_fkey" FOREIGN KEY ("plantId") REFERENCES "plant" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "plant_guardian_guardId_fkey" FOREIGN KEY ("guardId") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
