/*
  Warnings:

  - You are about to drop the column `nome` on the `PlanilhaFut` table. All the data in the column will be lost.
  - Added the required column `planilhaId` to the `PlanilhaFut` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `resultado` on the `PlanilhaFut` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Resultado" AS ENUM ('Certo', 'Errado', 'Reembolso');

-- DropForeignKey
ALTER TABLE "PlanilhaFut" DROP CONSTRAINT "PlanilhaFut_usuarioId_fkey";

-- AlterTable
ALTER TABLE "PlanilhaFut" DROP COLUMN "nome",
ADD COLUMN     "planilhaId" TEXT NOT NULL,
ALTER COLUMN "usuarioId" DROP NOT NULL,
DROP COLUMN "resultado",
ADD COLUMN     "resultado" "Resultado" NOT NULL;

-- CreateTable
CREATE TABLE "Planilha" (
    "id" TEXT NOT NULL,
    "usuarioId" TEXT NOT NULL,
    "nome" TEXT NOT NULL,

    CONSTRAINT "Planilha_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Planilha" ADD CONSTRAINT "Planilha_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlanilhaFut" ADD CONSTRAINT "PlanilhaFut_planilhaId_fkey" FOREIGN KEY ("planilhaId") REFERENCES "Planilha"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlanilhaFut" ADD CONSTRAINT "PlanilhaFut_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE SET NULL ON UPDATE CASCADE;
