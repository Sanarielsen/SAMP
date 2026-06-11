
export const formatCurrency = (cents: number) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(cents / 100)
}

export const convertCurrencyToCents = (
  value: number,
) => {
  return Math.round(value * 100)
}
