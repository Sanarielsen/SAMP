export class NonExistUserError extends Error {
  constructor() {
    super('User sent is not valid.')
  }
}