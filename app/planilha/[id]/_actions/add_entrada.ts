"use server";

import { db } from "@/app/_lib/prisma";
import { revalidatePath } from "next/cache";

interface PlanilhaFutParams {
  planilhaId: string;
  data: Date;
  competicao: string;
  mandante: string;
  visitante: string;
  metodo: string;
  stake: number;
  odd: number;
  resultado: string;
  lucro: number;
}

export const addEntrada = async (params: PlanilhaFutParams) => {
  await db.planilhaFut.create({
    data: {
      planilhaId: params.planilhaId,
      data: params.data,
      competicao: params.competicao,
      mandante: params.mandante,
      visitante: params.visitante,
      metodo: params.metodo,
      stake: params.stake,
      odd: params.odd,
      resultado: params.resultado,
      lucro: params.lucro,
    },
  });
};

revalidatePath("/");
