import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

export function formatDateTimeBrazil(date: string | Date): string {
  return dayjs
    .utc(date)
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