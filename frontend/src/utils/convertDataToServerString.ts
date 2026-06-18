import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

export function convertDataToServerString(
  value: string
): string {

  return dayjs(value, "DD/MM/YYYY", true).format("YYYY/MM/DD")
}