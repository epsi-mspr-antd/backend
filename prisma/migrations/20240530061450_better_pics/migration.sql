/*
  Warnings:

  - You are about to drop the `photo` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "photo";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "pic" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "url" TEXT NOT NULL,
    "objectId" INTEGER NOT NULL,
    "objectType" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "pic_objectId_fkey" FOREIGN KEY ("objectId") REFERENCES "plant" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "pic_objectId_fkey" FOREIGN KEY ("objectId") REFERENCES "tip" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "pic_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE INDEX "object_idx" ON "pic"("objectId", "objectType");
