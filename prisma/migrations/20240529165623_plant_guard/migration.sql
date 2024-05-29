/*
  Warnings:

  - You are about to drop the `plant_guardian` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "plant_guardian";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_plant" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "guardId" INTEGER,
    "userId" INTEGER NOT NULL,
    "addressId" INTEGER NOT NULL,
    "statusId" INTEGER NOT NULL,
    "speciesId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "plant_guardId_fkey" FOREIGN KEY ("guardId") REFERENCES "user" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "plant_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "plant_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "address" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "plant_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "plant_status" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "plant_speciesId_fkey" FOREIGN KEY ("speciesId") REFERENCES "plant_species" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_plant" ("addressId", "createdAt", "id", "name", "speciesId", "statusId", "updatedAt", "userId") SELECT "addressId", "createdAt", "id", "name", "speciesId", "statusId", "updatedAt", "userId" FROM "plant";
DROP TABLE "plant";
ALTER TABLE "new_plant" RENAME TO "plant";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
