import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

export function convertDataToServerString(
  value: string
): string {
  // Parse strictly with DD/MM/YYYY format
  const parsed = dayjs(value, "DD/MM/YYYY", true)
  
  if (!parsed.isValid()) {
    throw new Error(`Invalid date format: ${value}. Expected DD/MM/YYYY`)
  }

  return parsed.format("YYYY-MM-DD")
}

export function convertStringBrazilianDateToDate(
  value: string
): Date {

  const [day, month, year] = value.split('/').map(Number);

  return new Date(year, month - 1, day);
}