-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_plant_guardian" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "from" DATETIME NOT NULL,
    "to" DATETIME NOT NULL,
    "plantId" INTEGER NOT NULL,
    "guardId" INTEGER,
    CONSTRAINT "plant_guardian_plantId_fkey" FOREIGN KEY ("plantId") REFERENCES "plant" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "plant_guardian_guardId_fkey" FOREIGN KEY ("guardId") REFERENCES "user" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_plant_guardian" ("from", "guardId", "id", "plantId", "to") SELECT "from", "guardId", "id", "plantId", "to" FROM "plant_guardian";
DROP TABLE "plant_guardian";
ALTER TABLE "new_plant_guardian" RENAME TO "plant_guardian";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
