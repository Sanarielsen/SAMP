export class UserNotResponsibleForClientError extends Error {
  constructor() {
    super('The user is not responsible for this client.')
  }
}