export class INPIUnavailableError extends Error {
  constructor() {
    super('INPI service is unavailable.')
  }
}