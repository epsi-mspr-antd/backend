/*
  Warnings:

  - You are about to drop the `addresses` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `plant_statuses` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `plants` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `roles` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `sessions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "addresses";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "plant_statuses";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "plants";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "roles";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "sessions";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "users";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "user" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "role" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "role_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "session" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "token" TEXT,
    "userId" INTEGER NOT NULL,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "address" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "street" TEXT NOT NULL,
    "zip" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "longitude" TEXT NOT NULL,
    "latitude" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "address_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "plant" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "addressId" INTEGER NOT NULL,
    "statusId" INTEGER NOT NULL,
    "speciesId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "plant_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "plant_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "address" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "plant_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "plant_status" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "plant_speciesId_fkey" FOREIGN KEY ("speciesId") REFERENCES "plant_species" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "plant_status" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "plant_guard" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "from" DATETIME NOT NULL,
    "to" DATETIME NOT NULL,
    "plantId" INTEGER NOT NULL,
    "guardId" INTEGER NOT NULL,
    CONSTRAINT "plant_guard_plantId_fkey" FOREIGN KEY ("plantId") REFERENCES "plant" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "plant_guard_guardId_fkey" FOREIGN KEY ("guardId") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "photo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "url" TEXT NOT NULL,
    "plantId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "photo_plantId_fkey" FOREIGN KEY ("plantId") REFERENCES "plant" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "tip" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "description" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "plantId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "tip_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "tip_plantId_fkey" FOREIGN KEY ("plantId") REFERENCES "plant" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "session_userId_key" ON "session"("userId");
