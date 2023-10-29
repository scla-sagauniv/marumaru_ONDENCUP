/*
  Warnings:

  - You are about to drop the column `label` on the `Todo` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Todo` DROP COLUMN `lavel`,
    ADD COLUMN `label` VARCHAR(191) NULL;
