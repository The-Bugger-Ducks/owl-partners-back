/*
  Warnings:

  - Added the required column `commentType` to the `partner_comments` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "partnerCommentsType" AS ENUM ('ATUALIZACAO', 'ANOTACAO');

-- AlterTable
ALTER TABLE "partner_comments" ADD COLUMN     "commentType" "partnerCommentsType" NOT NULL;
