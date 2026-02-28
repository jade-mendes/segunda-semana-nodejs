/*
  Warnings:

  - A unique constraint covering the columns `[public_id]` on the table `comments` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[public_id]` on the table `likes` will be added. If there are existing duplicate values, this will fail.
  - The required column `public_id` was added to the `comments` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `public_id` was added to the `likes` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "comments" ADD COLUMN     "public_id" TEXT NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "likes" ADD COLUMN     "public_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "comments_public_id_key" ON "comments"("public_id");

-- CreateIndex
CREATE UNIQUE INDEX "likes_public_id_key" ON "likes"("public_id");
