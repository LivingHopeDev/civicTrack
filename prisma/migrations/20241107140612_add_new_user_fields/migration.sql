-- AlterTable
ALTER TABLE "users" ADD COLUMN     "google_id" TEXT,
ADD COLUMN     "image_url" TEXT,
ADD COLUMN     "is_verified" BOOLEAN NOT NULL DEFAULT false;
