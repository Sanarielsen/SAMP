import { useQuery } from "@tanstack/react-query";

export async function getProcessFromINPI(
  processNumber: string = ""
): Promise<string> {
  if (!processNumber) {
    throw new Error("Invalid process number");
  }

  const response = await fetch(
    `https://busca.inpi.gov.br/pePI/servlet/MarcasServletController?Action=searchMarca&NumPedido=${processNumber}&Source=OAMI&tipoPesquisa=BY_NUM_PROC`
  );

  if (!response.ok) {
    throw new Error("Error searching process");
  }

  // The response is HTML, not JSON
  return response.text();
}

export function useINPIProcess(processNumber: string, isEnabled: boolean) {
  return useQuery({
    queryKey: ["inpi-process", processNumber],
    queryFn: () => getProcessFromINPI(processNumber),

    enabled: isEnabled,

    staleTime: 1000 * 60 * 60,
  });
}