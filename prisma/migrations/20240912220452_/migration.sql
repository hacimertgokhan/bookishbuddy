/*
  Warnings:

  - Added the required column `writer` to the `Notes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Notes` ADD COLUMN `writer` VARCHAR(191) NOT NULL;
