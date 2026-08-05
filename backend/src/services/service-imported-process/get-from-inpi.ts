import { INPIClient } from "@/scripts/get-process-from-inpi";
import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error";
import { INPIUnavailableError } from "@/services/errors/inpi-unavailable-error";
import { parseSearchProcessFromINPI } from "@/utils/parseSearchProcessFromINPI";
import { parseDetail } from "@/utils/parserProcessImported";

import { 
  ImportedProcessDetailFromINPI 
} from "@shared/types/importedProcess";


export class GetImportedProcessFromINPIUseCase {
  constructor(
    private importedProcessFromINPIRepository = new INPIClient
  ) {}

  async execute(processNumber: string): Promise<ImportedProcessDetailFromINPI> {

    try {
      await this.importedProcessFromINPIRepository.login();
      const searchHtml = await this.importedProcessFromINPIRepository.search(processNumber);

      const process = parseSearchProcessFromINPI(searchHtml);
      if (!process) throw new ResourceNotFoundError();

      const detailHtml = await this.importedProcessFromINPIRepository.detail(process.codPedido);

      console.log("Result 1: ", detailHtml)

      return parseDetail(detailHtml);
    } catch (err) {
      if (err instanceof ResourceNotFoundError) throw err;
      throw new INPIUnavailableError();
    }
  }
}