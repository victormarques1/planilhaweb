-- CreateTable
CREATE TABLE "Usuario" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlanilhaFut" (
    "id" TEXT NOT NULL,
    "usuarioId" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "data" TIMESTAMP(3) NOT NULL,
    "competicao" TEXT NOT NULL,
    "mandante" TEXT NOT NULL,
    "visitante" TEXT NOT NULL,
    "metodo" TEXT NOT NULL,
    "stake" DOUBLE PRECISION NOT NULL,
    "odd" DOUBLE PRECISION NOT NULL,
    "resultado" TEXT NOT NULL,
    "lucro" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "PlanilhaFut_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PlanilhaFut" ADD CONSTRAINT "PlanilhaFut_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
