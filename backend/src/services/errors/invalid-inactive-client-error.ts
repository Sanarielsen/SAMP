export class InvalidInactiveClientError extends Error {
  constructor() {
    super('Cannot proceed with deactivated client')
  }
}