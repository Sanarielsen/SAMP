/*
  Warnings:

  - You are about to drop the column `joker` on the `user_roles` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "user_roles" DROP COLUMN "joker";

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "joker" INTEGER NOT NULL DEFAULT 0;
