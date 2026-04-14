/*
  Warnings:

  - You are about to drop the column `botanicalName` on the `herbs` table. All the data in the column will be lost.
  - You are about to drop the column `imageUrl` on the `herbs` table. All the data in the column will be lost.
  - You are about to drop the column `isFeatured` on the `herbs` table. All the data in the column will be lost.
  - You are about to drop the column `overview` on the `herbs` table. All the data in the column will be lost.
  - You are about to drop the column `preparationMethods` on the `herbs` table. All the data in the column will be lost.
  - You are about to drop the column `safetyInformation` on the `herbs` table. All the data in the column will be lost.
  - You are about to drop the column `traditionalUses` on the `herbs` table. All the data in the column will be lost.
  - Added the required column `description` to the `herbs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `precautions` to the `herbs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `uses` to the `herbs` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `benefits` on the `herbs` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropIndex
DROP INDEX "herbs_isFeatured_idx";

-- DropIndex
DROP INDEX "herbs_name_key";

-- AlterTable
ALTER TABLE "herbs" DROP COLUMN "botanicalName",
DROP COLUMN "imageUrl",
DROP COLUMN "isFeatured",
DROP COLUMN "overview",
DROP COLUMN "preparationMethods",
DROP COLUMN "safetyInformation",
DROP COLUMN "traditionalUses",
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "featured" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "image" TEXT,
ADD COLUMN     "nepaliName" TEXT,
ADD COLUMN     "precautions" JSONB NOT NULL,
ADD COLUMN     "region" TEXT,
ADD COLUMN     "scientificName" TEXT,
ADD COLUMN     "uses" JSONB NOT NULL,
DROP COLUMN "benefits",
ADD COLUMN     "benefits" JSONB NOT NULL,
ALTER COLUMN "isPublished" SET DEFAULT true;

-- CreateIndex
CREATE INDEX "herbs_featured_idx" ON "herbs"("featured");
