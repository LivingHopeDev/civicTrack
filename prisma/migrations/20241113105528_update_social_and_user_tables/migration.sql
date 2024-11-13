/*
  Warnings:

  - You are about to drop the column `platform` on the `socialMedias` table. All the data in the column will be lost.
  - You are about to drop the column `url` on the `socialMedias` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "socialMedias" DROP COLUMN "platform",
DROP COLUMN "url",
ADD COLUMN     "facebookUrl" TEXT,
ADD COLUMN     "instagramUrl" TEXT,
ADD COLUMN     "linkedinUrl" TEXT,
ADD COLUMN     "xUrl" TEXT;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "local_gov" TEXT,
ADD COLUMN     "state" TEXT;
