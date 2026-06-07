export class UnauthorizedUserError extends Error {
  constructor() {
    super('Only ADMIN users can execute this.')
  }
}