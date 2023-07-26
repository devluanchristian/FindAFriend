/*
  Warnings:

  - You are about to drop the column `breed` on the `pets` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `pets` table. All the data in the column will be lost.
  - Added the required column `about` to the `pets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ongId` to the `pets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "pets" DROP COLUMN "breed",
DROP COLUMN "description",
ADD COLUMN     "about" TEXT NOT NULL,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "ongId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "ongs" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "cep" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,

    CONSTRAINT "ongs_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "pets" ADD CONSTRAINT "pets_ongId_fkey" FOREIGN KEY ("ongId") REFERENCES "ongs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
