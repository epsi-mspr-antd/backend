-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_pic" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "url" TEXT NOT NULL,
    "objectId" INTEGER NOT NULL,
    "objectType" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "pic_objectId_fkey" FOREIGN KEY ("objectId") REFERENCES "plant" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "pic_objectId_fkey" FOREIGN KEY ("objectId") REFERENCES "tip" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "pic_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_pic" ("createdAt", "id", "objectId", "objectType", "url", "userId") SELECT "createdAt", "id", "objectId", "objectType", "url", "userId" FROM "pic";
DROP TABLE "pic";
ALTER TABLE "new_pic" RENAME TO "pic";
CREATE INDEX "object_idx" ON "pic"("objectId", "objectType");
CREATE TABLE "new_session" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "token" TEXT,
    "userId" INTEGER NOT NULL,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_session" ("id", "token", "updatedAt", "userId") SELECT "id", "token", "updatedAt", "userId" FROM "session";
DROP TABLE "session";
ALTER TABLE "new_session" RENAME TO "session";
CREATE UNIQUE INDEX "session_userId_key" ON "session"("userId");
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
    CONSTRAINT "plant_guardId_fkey" FOREIGN KEY ("guardId") REFERENCES "user" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "plant_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "plant_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "address" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "plant_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "plant_status" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "plant_speciesId_fkey" FOREIGN KEY ("speciesId") REFERENCES "plant_species" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_plant" ("addressId", "createdAt", "guardId", "id", "name", "speciesId", "statusId", "updatedAt", "userId") SELECT "addressId", "createdAt", "guardId", "id", "name", "speciesId", "statusId", "updatedAt", "userId" FROM "plant";
DROP TABLE "plant";
ALTER TABLE "new_plant" RENAME TO "plant";
CREATE TABLE "new_address" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "zip" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "longitude" REAL NOT NULL,
    "latitude" REAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "address_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_address" ("city", "createdAt", "id", "latitude", "longitude", "name", "street", "updatedAt", "userId", "zip") SELECT "city", "createdAt", "id", "latitude", "longitude", "name", "street", "updatedAt", "userId", "zip" FROM "address";
DROP TABLE "address";
ALTER TABLE "new_address" RENAME TO "address";
CREATE TABLE "new_role" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "role_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_role" ("id", "name", "userId") SELECT "id", "name", "userId" FROM "role";
DROP TABLE "role";
ALTER TABLE "new_role" RENAME TO "role";
CREATE TABLE "new_tip" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "description" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "plantId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "tip_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "tip_plantId_fkey" FOREIGN KEY ("plantId") REFERENCES "plant" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_tip" ("createdAt", "description", "id", "plantId", "updatedAt", "userId") SELECT "createdAt", "description", "id", "plantId", "updatedAt", "userId" FROM "tip";
DROP TABLE "tip";
ALTER TABLE "new_tip" RENAME TO "tip";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
