export function cleanValue(value: string) {
  return value.replace(/[.\-/]/g, '')
}