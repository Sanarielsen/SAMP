import type { ImportedProcessDetailFromINPI } from "@shared/types/importedProcess";


export const importedProcessInformation: ImportedProcessDetailFromINPI = {
  processNumber: '123456789',
  brand: 'Sanarielsen',
  nature: 'Natural',
  presentation: 'Apresentacao',
  depositDate: String(new Date(Date.now())),
  grantDate: String(new Date(Date.now())),
  expirationDate: String(new Date(Date.now())),
  status: 'Status',
  holder: 'Samuel',
  sourceEntireProcess: 'SAMUEL',
  specification: 'specificition',
  magazineNumber: '1234',
  updatedAtByMagazine: new Date(Date.now()),
  createdAt: new Date(Date.now()),
  updatedAt: new Date(Date.now())
}