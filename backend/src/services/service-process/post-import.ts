import { PDFParse } from "pdf-parse";
import path from "node:path";

import { ProcessRepository } from "@/repositories/process-repository";
import { importProcessesWithAPI } from "@/scripts/import-processes-with-api";

import { StorageProvider } from "@/storage/storage-provider";
import { ProcessHistoricRepository } from "@/repositories/process-historic-repository";
import { ProcessCategoryRepository } from "@/repositories/process-category-repository";

import { ImportDataError } from "@/services/errors/import-data-error";
import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error";

import { CreateProcessImportedDTO } from "@shared/types/process";
import { ProcessHistoric } from "@shared/types/processHistoric";
import { checkMagazineWillBeUploaded } from "@/utils/checkMagazineWillBeUploaded";

export class CreateProcessAsImportUseCase {
  constructor(
    private processRepository: ProcessRepository,
    private processHistoricRepository: ProcessHistoricRepository,
    private processCategoryRepository: ProcessCategoryRepository,
    private storageProvider: StorageProvider,
  ) {}

  async execute({ userId, categoryId, numberMagazine, fileMagazine }: CreateProcessImportedDTO): Promise<ProcessHistoric | null> {
    let fileName = numberMagazine + '.txt'
    let pathStorage = path.resolve(
      process.cwd(),
      "storage/process/brands",
      fileName
    );

    const category = await this.processCategoryRepository.findById(categoryId);

    if (!category) throw new ResourceNotFoundError();

    const magazineHistoric = await this.processHistoricRepository.findByNumberMagazine(numberMagazine);

    if (!magazineHistoric && fileMagazine) {

      try {
        const parser = new PDFParse({
          data: new Uint8Array(fileMagazine),
        });

        const result = await parser.getText();

        checkMagazineWillBeUploaded(result.text, numberMagazine)

        const nameWithoutExtension = path.parse(fileName).name;

        pathStorage = await this.storageProvider.upload(
          Buffer.from(result.text),
          `${nameWithoutExtension}.txt`,
          "storage/process/brands"
        );

        await this.processHistoricRepository.create({
          categoryId,
          numberMagazine,
          fileName,
          filePath: pathStorage
        })
        
      } catch (err) {
        if (err instanceof ImportDataError) {
          throw new ImportDataError();
        }
        
        throw err;
      }
    }

    try {
      await importProcessesWithAPI(pathStorage, numberMagazine);  
    } catch (err) {
      throw err;
    }
    
    return null 
  }
}