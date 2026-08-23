export type Field<T> = {
  title: string
  get: (data: T) => React.ReactNode
}