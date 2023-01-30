-- CreateEnum
CREATE TYPE "Language" AS ENUM ('RUSSIAN', 'ENGLISH', 'MANDARIN', 'GERMAN', 'SPANISH', 'ITALIAN', 'FRENCH');

-- CreateEnum
CREATE TYPE "Rating" AS ENUM ('GENERAL', 'TEEN', 'MATURE', 'EXPLICIT');

-- CreateEnum
CREATE TYPE "Category" AS ENUM ('GEN', 'FM', 'MM', 'FF', 'OTHER');

-- CreateTable
CREATE TABLE "Work" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "authorId" INTEGER NOT NULL,
    "lang" "Language" NOT NULL DEFAULT 'RUSSIAN',
    "rating" "Rating",
    "category" "Category",
    "description" TEXT NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Work_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Fandom" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Fandom_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tag" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_FandomToWork" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_TagToWork" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_FandomToWork_AB_unique" ON "_FandomToWork"("A", "B");

-- CreateIndex
CREATE INDEX "_FandomToWork_B_index" ON "_FandomToWork"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_TagToWork_AB_unique" ON "_TagToWork"("A", "B");

-- CreateIndex
CREATE INDEX "_TagToWork_B_index" ON "_TagToWork"("B");

-- AddForeignKey
ALTER TABLE "Work" ADD CONSTRAINT "Work_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FandomToWork" ADD CONSTRAINT "_FandomToWork_A_fkey" FOREIGN KEY ("A") REFERENCES "Fandom"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FandomToWork" ADD CONSTRAINT "_FandomToWork_B_fkey" FOREIGN KEY ("B") REFERENCES "Work"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TagToWork" ADD CONSTRAINT "_TagToWork_A_fkey" FOREIGN KEY ("A") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TagToWork" ADD CONSTRAINT "_TagToWork_B_fkey" FOREIGN KEY ("B") REFERENCES "Work"("id") ON DELETE CASCADE ON UPDATE CASCADE;
