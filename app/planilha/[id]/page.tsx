import { db } from "@/app/_lib/prisma";
import NovoRegistro from "./_components/novo_registro";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/app/_components/ui/table";
import { format } from "date-fns";
import { PlanilhaFut } from "@prisma/client";

interface PlanilhaProps {
  params: {
    id: string;
  };
}

const PlanilhaById = async ({ params }: PlanilhaProps) => {
  const dadosPlanilha = await db.planilhaFut.findMany({
    where: {
      planilhaId: params.id,
    },
  });

  return (
    <div>
      <div className="mt-4 mx-auto max-w-7xl">
        <h2 className="text-center mb-4">Planilhas</h2>

        <NovoRegistro params={params} />

        <div className="overflow-x-auto text-center">
          <Table className="w-full">
            <TableHeader>
              <TableRow>
                <TableCell>Data</TableCell>
                <TableCell>Competição</TableCell>
                <TableCell>Mandante</TableCell>
                <TableCell>Visitante</TableCell>
                <TableCell>Mercado</TableCell>
                <TableCell>Stake</TableCell>
                <TableCell>Odd</TableCell>
                <TableCell>Resultado</TableCell>
                <TableCell>Lucro</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {dadosPlanilha.map((planilha) => (
                <TableRow key={planilha.id}>
                  <TableCell>
                    {planilha.data
                      ? format(new Date(planilha.data), "dd/MM/yyyy")
                      : ""}
                  </TableCell>
                  <TableCell>{planilha.competicao}</TableCell>
                  <TableCell>{planilha.mandante}</TableCell>
                  <TableCell>{planilha.visitante}</TableCell>
                  <TableCell>{planilha.metodo}</TableCell>
                  <TableCell>{planilha.stake}u</TableCell>
                  <TableCell>{planilha.odd}</TableCell>

                  {planilha.resultado === "Certo" ? (
                    <TableCell className="font-medium text-green-800 bg-green-200">
                      {planilha.resultado}
                    </TableCell>
                  ) : (
                    <TableCell className="font-medium text-red-800 bg-red-200">
                      {planilha.resultado}
                    </TableCell>
                  )}
                  <TableCell>{planilha.lucro}u</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default PlanilhaById;
