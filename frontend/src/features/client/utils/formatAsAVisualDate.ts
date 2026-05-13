export function formatAsVisualDate(
  value: string
) {
  if (!value) return ''

  const [year, month, day] =
    value.split('T')[0].split('-')

  return `${day}/${month}/${year}`
}

export function formatToApiDate(
  value: string
) {
  const [day, month, year] =
    value.split('/')

  return `${year}-${month}-${day}`
}