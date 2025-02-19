/*
  Warnings:

  - Changed the type of `type` on the `Content` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "ContentType" AS ENUM ('interactive_text', 'flashcards', 'quiz', 'video', 'podcast', 'practice');

-- AlterTable
ALTER TABLE "Content" DROP COLUMN "type",
ADD COLUMN     "type" "ContentType" NOT NULL;
