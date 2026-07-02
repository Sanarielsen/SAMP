import { PDFParse } from "pdf-parse";
import path from "node:path";

import { importProcessesWithAPI } from "@/scripts/import-processes-with-api";
import { ProcessRepository } from "@/repositories/process-repository";

import { StorageProvider } from "@/storage/storage-provider";
import { ProcessHistoricRepository } from "@/repositories/process-historic-repository";
import { ProcessCategoryRepository } from "@/repositories/process-category-repository";

import { ImportDataError } from "@/services/errors/import-data-error";
import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error";

import { CreateProcessImportedDTO } from "@shared/types/process";
import { ProcessHistoric } from "@shared/types/processHistoric";

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
      "src/storage/process/brands",
      fileName
    );

    const category = await this.processCategoryRepository.findById(categoryId);

    if (!category) throw new ResourceNotFoundError();

    const magazineHistoric = await this.processHistoricRepository.findByNumberMagazine(numberMagazine);

    //Se ele nao encontrar, ai parsea e importa
    if (!magazineHistoric) {
      try {
        console.log("CRIA O REGISTRO")
        const buffer = await fileMagazine.toBuffer();

        const parser = new PDFParse({
          data: new Uint8Array(buffer),
        });

        const result = await parser.getText();

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

    await importProcessesWithAPI(pathStorage);

    return null 
  }
}