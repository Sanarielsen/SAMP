import { PDFParse } from "pdf-parse";
import path from "node:path";

import { StorageProvider } from "@/storage/storage-provider";
import { ImportedProcessRepository } from "@/repositories/process-imported-repository";
import { ProcessHistoryRepository } from "@/repositories/process-historic-repository";
import { ProcessCategoryRepository } from "@/repositories/process-category-repository";
import { ImportDataError } from "@/services/errors/import-data-error";
import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error";
import { importProcessesWithAPI } from "@/scripts/import-processes-with-api";
import { checkMagazineWillBeUploaded } from "@/utils/checkMagazineWillBeUploaded";

import { CreatedProcessImportedDTO, CreateProcessImportedDTO } from "@shared/types/processImported";
import { ProcessHistory } from "@shared/types/processHistory";
import { getRequiredEnv } from "@/utils/getRequiredEnv";


export class CreateProcessAsImportUseCase {
  constructor(
    private importedProcessRepository: ImportedProcessRepository,
    private processHistoricRepository: ProcessHistoryRepository,
    private processCategoryRepository: ProcessCategoryRepository,
    private storageProvider: StorageProvider,
  ) {}

  async execute({ userId, categoryId, numberMagazine, fileMagazine }: CreateProcessImportedDTO): Promise<number | null> {

    console.log("POST /process/imported INICIOI");
    let importedProcesses: CreatedProcessImportedDTO[]
    let magazineHistoric: ProcessHistory | null;
    let importedRowsQuantity: number = 0;

    let fileName = numberMagazine + '.txt'
    let defaultStorage = getRequiredEnv('NODE_ENV') + '/processes/brands'
    let pathStorage = defaultStorage + '/' + fileName

    const category = await this.processCategoryRepository.findById(categoryId);

    if (!category) throw new ResourceNotFoundError();

    console.log("POST /process/imported chegou no history");
    magazineHistoric = await this.processHistoricRepository.findByNumberMagazine(numberMagazine);

    if (!magazineHistoric) {

      console.log("PDF:", (fileMagazine.length / 1024 / 1024).toFixed(2), "MB");

      console.log("POST /process/imported comecou a parsear");

      try {
        const parser = new PDFParse({
          data: new Uint8Array(fileMagazine),
        });

        const result = await parser.getText();

        console.log("POST /process/imported parseou");

        checkMagazineWillBeUploaded(result.text, numberMagazine)

        pathStorage = await this.storageProvider.upload(
          Buffer.from(result.text),
          fileName,
          defaultStorage
        );

        magazineHistoric = await this.processHistoricRepository.create({
          categoryId,
          numberMagazine,
          fileName,
          filePath: pathStorage
        })

        importedProcesses = await importProcessesWithAPI(
          Buffer.from(result.text), 
          userId, 
          magazineHistoric!.id, 
          categoryId
        );

        importedRowsQuantity = await this.importedProcessRepository.createManyAsImport(importedProcesses)
      } catch (err) {
        console.log(err)
        if (err instanceof ImportDataError) {
          throw new ImportDataError();
        }
        throw err;
      }
    }

    return importedRowsQuantity
  }
}