"use client";

import { useState } from "react";
import { Button } from "@/app/_components/ui/button";
import { Input } from "@/app/_components/ui/input";
import { Label } from "@/app/_components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/app/_components/ui/sheet";
import { FilePlus } from "lucide-react";
import React from "react";
import { addEntrada } from "../_actions/add_entrada";
import { PlanilhaFut } from "@prisma/client";
import { Select } from "@/app/_components/ui/select";
import {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/_components/ui/select";

interface PlanilhaProps {
  params: {
    id: string;
  };
}

const NovoRegistro = ({ params }: PlanilhaProps) => {
  const [data, setData] = useState("");
  const [competicao, setCompeticao] = useState("");
  const [mandante, setMandante] = useState("");
  const [visitante, setVisitante] = useState("");
  const [metodo, setMetodo] = useState("");
  const [stake, setStake] = useState("");
  const [odd, setOdd] = useState("");
  const [resultado, setResultado] = useState("");

  let lucro = 0;
  if (resultado === "Certo") {
    lucro = Number(stake) * Number(odd) - Number(stake);
  } else {
    lucro = -stake;
  }

  const salvarRegistroClick = async () => {
    try {
      await addEntrada({
        planilhaId: params.id,
        data: new Date(data),
        competicao: competicao,
        mandante: mandante,
        visitante: visitante,
        metodo: metodo,
        stake: Number(stake),
        odd: Number(odd),
        resultado: resultado,
        lucro: Number(lucro),
      });

      setData("");
      setCompeticao("");
      setMandante("");
      setVisitante("");
      setMetodo("");
      setStake("");
      setOdd("");
      setResultado("");
      lucro = 0;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="text-center m-4">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" className="bg-green-600 text-white">
            Registrar Nova Entrada <FilePlus className="ml-2" size={20} />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="overflow-x-auto">
          <SheetHeader>
            <SheetTitle>Registrar nova entrada</SheetTitle>
          </SheetHeader>
          <div className="items-center ">
            <div className=" my-2">
              <Label>Data</Label>
              <Input
                type="date"
                className="mt-1 max-w-2xl"
                value={data}
                onChange={(e) => setData(e.target.value)}
              />
            </div>
            <div className="my-2">
              <Label>Competição</Label>
              <Input
                type="text"
                className="mt-1 max-w-2xl"
                value={competicao}
                onChange={(e) => setCompeticao(e.target.value)}
              />
            </div>
            <div className="my-2">
              <Label>Mandante</Label>
              <Input
                type="text"
                className="mt-1 max-w-2xl"
                value={mandante}
                onChange={(e) => setMandante(e.target.value)}
              />
            </div>
            <div className="my-2">
              <Label>Visitante</Label>
              <Input
                type="text"
                className="mt-1 max-w-2xl"
                value={visitante}
                onChange={(e) => setVisitante(e.target.value)}
              />
            </div>
            <div className="my-2">
              <Label>Método</Label>
              <Input
                type="text"
                className="mt-1 max-w-2xl"
                value={metodo}
                onChange={(e) => setMetodo(e.target.value)}
              />
            </div>
            <div className="my-2">
              <Label>Stake</Label>
              <Input
                type="text"
                className="mt-1 max-w-2xl"
                value={stake}
                onChange={(e) => setStake(e.target.value)}
              />
            </div>
            <div className="my-2">
              <Label>Odd</Label>
              <Input
                type="text"
                className="mt-1 max-w-2xl"
                value={odd}
                onChange={(e) => setOdd(e.target.value)}
              />
            </div>

            <div className="my-2">
              <Label>Resultado</Label>
              <Select value={resultado} onValueChange={setResultado}>
                <SelectTrigger className="mt-1 max-w-2xl">
                  <SelectValue placeholder="Selecione o resultado da aposta" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem
                      value="Certo"
                      className="bg-green-700 focus:bg-green-600 text-white"
                    >
                      Certo
                    </SelectItem>
                    <SelectItem
                      value="Errado"
                      className="bg-red-700 focus:bg-red-600 text-white"
                    >
                      Errado
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="my-2">
              <Label>Lucro</Label>
              <Input type="text" className="mt-1 max-w-2xl" value={lucro} />
            </div>
          </div>
          <SheetFooter>
            <SheetClose asChild>
              <Button
                type="submit"
                className="mt-2 max-w-2xl"
                onClick={salvarRegistroClick}
              >
                Salvar
              </Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default NovoRegistro;
