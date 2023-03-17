-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'SIMPLE');

-- CreateEnum
CREATE TYPE "PartnerClassification" AS ENUM ('COLEGIOS', 'UNIVERSIDADES', 'SECRETARIAS', 'GOVERNOS');

-- CreateEnum
CREATE TYPE "PartnerStatus" AS ENUM ('P', 'PC', 'PR', 'ADOCE', 'ADOCDA', 'ADOCD', 'DOCD', 'PREPES', 'AESL', 'AESAG', 'PA', 'PF');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "lastName" TEXT,
ADD COLUMN     "role" "UserRole" NOT NULL DEFAULT 'SIMPLE';

-- CreateTable
CREATE TABLE "partners" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "zipCode" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "neighborhood" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "classification" "PartnerClassification" NOT NULL,
    "status" "PartnerStatus" NOT NULL,
    "memberNumber" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "partners_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "partner_comments" (
    "id" TEXT NOT NULL,
    "partnerId" TEXT,
    "userId" TEXT,
    "comment" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "partner_comments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "partners_email_key" ON "partners"("email");

-- AddForeignKey
ALTER TABLE "partner_comments" ADD CONSTRAINT "partner_comments_partnerId_fkey" FOREIGN KEY ("partnerId") REFERENCES "partners"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "partner_comments" ADD CONSTRAINT "partner_comments_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
