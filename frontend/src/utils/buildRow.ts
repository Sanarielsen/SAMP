type Row<T> = {
  title: string
  description: string
  raw: T
}

export function buildRow<T>(
  title: string,
  source: T,
  getDescription: (item: T) => string
): Row<T> {
  return {
    title,
    description: getDescription(source),
    raw: source,
  }
}