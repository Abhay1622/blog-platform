/*
  Warnings:

  - You are about to drop the column `published` on the `post` table. All the data in the column will be lost.
  - You are about to drop the column `slug` on the `post` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `post` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `Post_slug_key` ON `post`;

-- AlterTable
ALTER TABLE `post` DROP COLUMN `published`,
    DROP COLUMN `slug`,
    DROP COLUMN `updatedAt`;
