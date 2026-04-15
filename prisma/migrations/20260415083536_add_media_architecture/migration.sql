/*
  Warnings:

  - You are about to drop the column `featuredImageUrl` on the `blog_posts` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `herbs` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "blog_posts" DROP COLUMN "featuredImageUrl",
ADD COLUMN     "featuredImageAlt" TEXT,
ADD COLUMN     "featuredImagePath" TEXT,
ADD COLUMN     "imageLicense" TEXT,
ADD COLUMN     "imagePhotographer" TEXT,
ADD COLUMN     "imageSourceName" TEXT,
ADD COLUMN     "imageSourceUrl" TEXT;

-- AlterTable
ALTER TABLE "herbs" DROP COLUMN "image",
ADD COLUMN     "imageAlt" TEXT,
ADD COLUMN     "imageLicense" TEXT,
ADD COLUMN     "imagePath" TEXT,
ADD COLUMN     "imagePhotographer" TEXT,
ADD COLUMN     "imageSourceName" TEXT,
ADD COLUMN     "imageSourceUrl" TEXT,
ADD COLUMN     "imageVerifiedAt" TIMESTAMP(3);
