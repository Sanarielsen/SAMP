export class ImportDataError extends Error {
  constructor() {
    super('An error occurred while executing the importer.')
  }
}