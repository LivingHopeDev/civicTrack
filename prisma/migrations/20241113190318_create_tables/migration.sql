-- CreateEnum
CREATE TYPE "userRole" AS ENUM ('admin', 'citizen', 'polRep');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT,
    "role" "userRole" NOT NULL DEFAULT 'citizen',
    "is_verified" BOOLEAN NOT NULL DEFAULT false,
    "google_id" TEXT,
    "image_url" TEXT,
    "state" TEXT,
    "local_gov" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "otps" (
    "id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expiry" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "otps_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "socialMedias" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "facebookUrl" TEXT,
    "xUrl" TEXT,
    "linkedinUrl" TEXT,
    "instagramUrl" TEXT,

    CONSTRAINT "socialMedias_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "politicalProfiles" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "politicalProfiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contactInfos" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "hotline" TEXT NOT NULL,

    CONSTRAINT "contactInfos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "professions" (
    "id" TEXT NOT NULL,
    "politicalProfileId" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "term" TEXT NOT NULL,
    "startDate" TEXT NOT NULL,
    "endDate" TEXT NOT NULL,

    CONSTRAINT "professions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "educations" (
    "id" TEXT NOT NULL,
    "politicalProfileId" TEXT NOT NULL,
    "institution" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "educations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "previousRoles" (
    "id" TEXT NOT NULL,
    "politicalProfileId" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "previousRoles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "politicalParties" (
    "id" TEXT NOT NULL,
    "politicalProfileId" TEXT NOT NULL,
    "partyName" TEXT NOT NULL,
    "yearJoined" INTEGER NOT NULL,

    CONSTRAINT "politicalParties_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_id_key" ON "users"("id");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "otps_id_key" ON "otps"("id");

-- CreateIndex
CREATE UNIQUE INDEX "socialMedias_id_key" ON "socialMedias"("id");

-- CreateIndex
CREATE UNIQUE INDEX "politicalProfiles_id_key" ON "politicalProfiles"("id");

-- CreateIndex
CREATE UNIQUE INDEX "contactInfos_id_key" ON "contactInfos"("id");

-- CreateIndex
CREATE UNIQUE INDEX "contactInfos_userId_key" ON "contactInfos"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "professions_id_key" ON "professions"("id");

-- CreateIndex
CREATE UNIQUE INDEX "educations_id_key" ON "educations"("id");

-- CreateIndex
CREATE UNIQUE INDEX "previousRoles_id_key" ON "previousRoles"("id");

-- CreateIndex
CREATE UNIQUE INDEX "politicalParties_id_key" ON "politicalParties"("id");

-- AddForeignKey
ALTER TABLE "otps" ADD CONSTRAINT "otps_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "socialMedias" ADD CONSTRAINT "socialMedias_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "politicalProfiles" ADD CONSTRAINT "politicalProfiles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contactInfos" ADD CONSTRAINT "contactInfos_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "professions" ADD CONSTRAINT "professions_politicalProfileId_fkey" FOREIGN KEY ("politicalProfileId") REFERENCES "politicalProfiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "educations" ADD CONSTRAINT "educations_politicalProfileId_fkey" FOREIGN KEY ("politicalProfileId") REFERENCES "politicalProfiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "previousRoles" ADD CONSTRAINT "previousRoles_politicalProfileId_fkey" FOREIGN KEY ("politicalProfileId") REFERENCES "politicalProfiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "politicalParties" ADD CONSTRAINT "politicalParties_politicalProfileId_fkey" FOREIGN KEY ("politicalProfileId") REFERENCES "politicalProfiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;
