import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

export function formatDateTimeBrazil(date: string | Date | null | undefined): string {
  const formattedDate = dayjs.utc(date)

  if (!formattedDate.isValid()) {
    return ""
  }

  return formattedDate
    .tz("America/Sao_Paulo")
    .format("DD/MM/YYYY HH:mm");
}

export function convertBrazilDateTimeToUTC(
  value: string
): string {
  return dayjs
    .tz(value, "DD/MM/YYYY HH:mm", "America/Sao_Paulo")
    .utc()
    .toISOString();
}