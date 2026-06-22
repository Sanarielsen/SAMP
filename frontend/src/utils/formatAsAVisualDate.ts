export function formatAsVisualDate(
  value: string
) {
  if (!value) return ''

  const [date, time] = value.split('T')

  const [year, month, day] = date.split('-')

  const [hours, minutes] = time.split(':')

  return `${day}/${month}/${year} ${hours}:${minutes}`
}

export function formatAsVisualDateTime(value: string | Date) {
  return new Intl.DateTimeFormat("pt-BR", {
    timeZone: "America/Sao_Paulo",
    dateStyle: "short",
    timeStyle: "short",
  }).format(new Date(value));
}

export function formatAsVisualOnlyDate(value: string) {
  if (!value) return ''

  const [date] = value.split('T')
  const [year, month, day] = date.split('-')

  return `${day}/${month}/${year}`
}

export function formatToApiDate(
  value: string
) {
  const [day, month, year] =
    value.split('/')

  return `${year}-${month}-${day}`
}