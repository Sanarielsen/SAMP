import { INPIClient } from "@/scripts/get-process-from-inpi";
import { parseSearchProcessFromINPI } from "@/utils/parseSearchProcessFromINPI";
import { parseDetail } from "@/utils/parserProcessImported";
import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error";
import { INPIUnavailableError } from "@/services/errors/inpi-unavailable-error";

import { 
  ImportedProcessDetailFromINPI 
} from "@shared/types/processImported";


export class GetImportedProcessFromINPIUseCase {
  constructor(
    private importedProcessFromINPIRepository = new INPIClient
  ) {}

  async execute(processNumber: string): Promise<ImportedProcessDetailFromINPI | null> {

    const client = new INPIClient();
    try {
      await client.login();
      const searchHtml = await client.search(processNumber);

      const process = parseSearchProcessFromINPI(searchHtml);
      if (!process) throw new ResourceNotFoundError();

      const detailHtml = await client.detail(process.codPedido);

      return parseDetail(detailHtml);
    } catch (err) {
      if (err instanceof ResourceNotFoundError) throw err;
      throw new INPIUnavailableError();
    }
  }
}