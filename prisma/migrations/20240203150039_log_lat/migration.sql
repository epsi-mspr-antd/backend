/*
  Warnings:

  - You are about to alter the column `latitude` on the `address` table. The data in that column could be lost. The data in that column will be cast from `String` to `Float`.
  - You are about to alter the column `longitude` on the `address` table. The data in that column could be lost. The data in that column will be cast from `String` to `Float`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_address" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "street" TEXT NOT NULL,
    "zip" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "longitude" REAL NOT NULL,
    "latitude" REAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "address_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_address" ("city", "createdAt", "id", "latitude", "longitude", "street", "updatedAt", "userId", "zip") SELECT "city", "createdAt", "id", "latitude", "longitude", "street", "updatedAt", "userId", "zip" FROM "address";
DROP TABLE "address";
ALTER TABLE "new_address" RENAME TO "address";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
