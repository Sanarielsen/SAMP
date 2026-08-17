import BoxError from "@/components/BoxError";
import BoxIdle from "@/components/BoxIdle";
import BoxLoading from "@/components/BoxLoading";
import BoxSuccessWithoutData from "@/components/BoxSuccessWithoutData";


type ApiStateProps = {
  state: "LOADING" | "ERROR" | "EMPTY" | "IDLE";
  loadingMessage?: string;
  errorMessage?: string;
  emptyMessage?: string;
  idleMessage?: string;
};

export function BoxResult({
  state,
  loadingMessage = "Carregando os dados, aguarde...",
  errorMessage = "Erro ao carregar os dados. Tente novamente.",
  emptyMessage = "Nenhum dado encontrado.",
  idleMessage = "Preencha os filtros para realizar uma busca.",
}: ApiStateProps) {
  if (state === "LOADING") {
    return <BoxLoading description={loadingMessage} />;
  }

  if (state === "ERROR") {
    return <BoxError description={errorMessage} />;
  }

  if (state === "EMPTY") {
    return <BoxSuccessWithoutData description={emptyMessage} />;
  }

  if (state === "IDLE") {
    return <BoxIdle description={idleMessage} />;
  }

  return null;
}