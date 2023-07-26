/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `ongs` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "pets" ALTER COLUMN "dog_size" SET DEFAULT 'Pequenino',
ALTER COLUMN "energy_level" SET DEFAULT 'Muito Baixa',
ALTER COLUMN "idependencies_Level" SET DEFAULT 'Baixo (precisa de companhia sempre)',
ALTER COLUMN "age" SET DEFAULT 'Filhote';

-- CreateIndex
CREATE UNIQUE INDEX "ongs_email_key" ON "ongs"("email");
