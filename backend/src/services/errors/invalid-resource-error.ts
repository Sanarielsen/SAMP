export class InvalidResourceError extends Error {
  constructor() {
    super('Invalid resource provided.')
  }
}