/*
  Warnings:

  - Changed the type of `idependencies_Level` on the `pets` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "IndependenciesLevel" AS ENUM ('Baixo (precisa de companhia sempre)', 'Médio (precisa de companhia moderada)', 'Alto (precisa de companhia constante)');

-- AlterTable
ALTER TABLE "pets" DROP COLUMN "idependencies_Level",
ADD COLUMN     "idependencies_Level" "IndependenciesLevel" NOT NULL;

-- DropEnum
DROP TYPE "IdependenciesLevel";
