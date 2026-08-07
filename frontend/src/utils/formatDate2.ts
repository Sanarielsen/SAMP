import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import utc from 'dayjs/plugin/utc'

dayjs.extend(customParseFormat)
dayjs.extend(utc)

export function formatAsVisualOnlyDate(
  value: string | Date | null | undefined,
) {
  if (!value) return ''

  // If it's a string, check if it's already in DD/MM/YYYY format
  if (typeof value === 'string') {
    // Check if it matches DD/MM/YYYY pattern
    if (/^\d{2}\/\d{2}\/\d{4}$/.test(value)) {
      return value
    }
    // Otherwise, parse as ISO format (YYYY-MM-DD or full ISO)
    // Use UTC mode to prevent timezone shifting
    if (value.includes('T') || value.includes('Z')) {
      // ISO datetime string - parse as UTC
      return dayjs.utc(value).format('DD/MM/YYYY')
    }
    // ISO date string (YYYY-MM-DD) - parse as UTC
    return dayjs.utc(value, 'YYYY-MM-DD').format('DD/MM/YYYY')
  }

  // For Date objects, treat as local time since JS Date doesn't preserve timezone
  return dayjs(value).format('DD/MM/YYYY')
}

export function formatAsVisualOnlyDateEUtoBR(
  value: string | Date | null | undefined,
) {
  if (!value) return '';

  if (typeof value === 'string') {
    return dayjs(value, 'MM/DD/YYYY').format('DD/MM/YYYY');
  }

  return dayjs(value).format('DD/MM/YYYY');
}