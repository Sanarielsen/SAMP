import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);


export function formatDate(
  date?: string | Date | null,
  withTime = false
): string {
  if (!date) return "";

  if (withTime) {
    return dayjs(date).format("DD/MM/YYYY HH:mm");
  }

  if (typeof date === "string" && date.includes("/")) {
    return dayjs
      .utc(date, "DD/MM/YYYY")
      .format("DD/MM/YYYY");
  }

  return dayjs.utc(date).format("DD/MM/YYYY");
}

export function parseDate(
  date?: string | Date | null,
  withTime = false
): Date | null {
  if (!date) return null;

  if (date instanceof Date) {
    return date;
  }

  if (withTime) {
    return dayjs
      .utc(date, "DD/MM/YYYY HH:mm")
      .toDate();
  }

  const parsed = dayjs(date, "DD/MM/YYYY");

  return new Date(
    parsed.year(),
    parsed.month(),
    parsed.date()
  );
}