/*
  Warnings:

  - Added the required column `dog_size` to the `pets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `energy_level` to the `pets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `idependencies_Level` to the `pets` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `age` on the `pets` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Dog_Size" AS ENUM ('Pequenino', 'Médio', 'Grande');

-- CreateEnum
CREATE TYPE "Energy_Level" AS ENUM ('Muito Baixa', 'Baixa', 'Media', 'Alta', 'Muito Alta');

-- CreateEnum
CREATE TYPE "Space" AS ENUM ('Amplo', 'Médio', 'Pequeno');

-- CreateEnum
CREATE TYPE "IdependenciesLevel" AS ENUM ('Baixo (precisa de companhia sempre)', 'Médio (precisa de companhia moderada)', 'Alto (precisa de companhia constante)');

-- CreateEnum
CREATE TYPE "Age" AS ENUM ('Filhote', 'Jovem', 'Adulto');

-- CreateEnum
CREATE TYPE "Animal_Type" AS ENUM ('Cachorro', 'Gato');

-- AlterTable
ALTER TABLE "pets" ADD COLUMN     "dog_size" "Dog_Size" NOT NULL,
ADD COLUMN     "energy_level" "Energy_Level" NOT NULL,
ADD COLUMN     "idependencies_Level" "IdependenciesLevel" NOT NULL,
DROP COLUMN "age",
ADD COLUMN     "age" "Age" NOT NULL;
