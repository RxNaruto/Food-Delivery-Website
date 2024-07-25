/*
  Warnings:

  - You are about to drop the column `ownerId` on the `restaurants` table. All the data in the column will be lost.
  - Added the required column `adminId` to the `restaurants` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "restaurants" DROP CONSTRAINT "restaurants_ownerId_fkey";

-- AlterTable
ALTER TABLE "restaurants" DROP COLUMN "ownerId",
ADD COLUMN     "adminId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "restaurants" ADD CONSTRAINT "restaurants_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "admin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
