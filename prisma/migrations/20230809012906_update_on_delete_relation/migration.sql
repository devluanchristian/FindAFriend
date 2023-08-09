-- DropForeignKey
ALTER TABLE "pets" DROP CONSTRAINT "pets_ongId_fkey";

-- AddForeignKey
ALTER TABLE "pets" ADD CONSTRAINT "pets_ongId_fkey" FOREIGN KEY ("ongId") REFERENCES "ongs"("id") ON DELETE CASCADE ON UPDATE CASCADE;
