/*
  Warnings:

  - Changed the type of `resultado` on the `PlanilhaFut` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "PlanilhaFut" DROP COLUMN "resultado",
ADD COLUMN     "resultado" TEXT NOT NULL;

-- DropEnum
DROP TYPE "Resultado";
