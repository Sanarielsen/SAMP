export function parseStringDateToBrazilianDate(value: string): Date {
  const [day, month, year] = value.split("/").map(Number);

  return new Date(Date.UTC(year, month - 1, day));
}