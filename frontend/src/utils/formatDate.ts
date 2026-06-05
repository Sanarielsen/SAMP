export function parseBRDate(dateString: string): Date {
  const [day, month, year] =
    dateString.split('/')

  return new Date(
    Number(year),
    Number(month) - 1,
    Number(day),
  )
}

// export const parseDMYDate = (dateStr: string | undefined): Date | null => {
//   if (!dateStr) return null;
//   const parsed = dayjs(dateStr, "DD/MM/YYYY", true);
//   if (!parsed.isValid()) return null; // Check if parsing succeeded
//   return parsed.toDate();
// };

export const parseDMYDate = (dateStr: string | undefined): Date | null => {
  if (!dateStr) return null;
  
  const [day, month, year] = dateStr.split('/').map(Number);
  
  // Validate the date
  const date = new Date(year, month - 1, day);
  if (isNaN(date.getTime())) return null;
  
  return date;
};