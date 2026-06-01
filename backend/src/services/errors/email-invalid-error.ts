export class EmailInvalidError extends Error {
  constructor() {
    super('Email used was invalid.')
  }
}