import dayjs from 'dayjs'

export function formatAsVisualOnlyDate(
  value: string | Date | null | undefined,
) {
  if (!value) return ''

  return dayjs(value).format('DD/MM/YYYY')
}