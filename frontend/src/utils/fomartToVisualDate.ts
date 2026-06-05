import dayjs from "dayjs";

export const formatStringToVisualDate = (date: string | Date) => {  
  return dayjs(date).format('DD/MM/YYYY HH:MM') 
}