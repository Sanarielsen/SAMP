import { useQuery } from "@tanstack/react-query";

import type { CEPResponse } from "@/types/address";

export async function getAddressByCep(
  cep: string = ""
): Promise<CEPResponse> {
  const cleanedCep = cep.replace(/\D/g, "");

  if (cleanedCep.length !== 8) {
    throw new Error("Invalid CEP");
  }

  const response = await fetch(
    `https://viacep.com.br/ws/${cleanedCep}/json/`
  );

  if (!response.ok) {
    throw new Error("Error searching CEP");
  }

  const data = await response.json();

  if (data.erro) {
    throw new Error("CEP not found");
  }

  return data;
}

export function useCep(cep?: string) {
  const cleanedCep = (cep ?? "").replace(/\D/g, "");

  return useQuery({
    queryKey: ["cep", cleanedCep],
    queryFn: () => getAddressByCep(cleanedCep),

    enabled: false,

    staleTime: 1000 * 60 * 60,
  });
}