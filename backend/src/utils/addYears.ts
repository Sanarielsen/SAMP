export function addYears(date: Date | null, years: number) {
  if (!date) return null;

  const result = new Date(date);
  result.setFullYear(result.getFullYear() + years);
  return result;
}