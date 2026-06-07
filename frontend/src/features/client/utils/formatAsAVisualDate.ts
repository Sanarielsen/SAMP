export function formatAsVisualDate(
  value: string
) {
  if (!value) return ''

  const [date, time] = value.split('T')

  const [year, month, day] = date.split('-')

  const [hours, minutes] = time.split(':')

  return `${day}/${month}/${year} ${hours}:${minutes}`
}

export function formatToApiDate(
  value: string
) {
  const [day, month, year] =
    value.split('/')

  return `${year}-${month}-${day}`
}