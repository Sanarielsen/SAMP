export class MissingEnvironmentVariableError extends Error {
  constructor() {
    super('Missing environment variable');
  }
}