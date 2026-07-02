import path from "node:path";
import { readFile } from "node:fs/promises";
import { PDFParse } from "pdf-parse";

import { ProcessRepository } from "@/repositories/process-repository";

import { CreateProcessImportedDTO } from "@shared/types/process";
import { ProcessHistoric } from "@prisma/client";


export class PrismaProcessRepository implements ProcessRepository {
  async createAsImport(importProps: CreateProcessImportedDTO): Promise<ProcessHistoric | null> {
    const filePath = path.resolve(process.cwd(), "src/storage/INPI/Marcas2895.pdf");
    const file = await readFile(filePath);

    const parser = new PDFParse({ data: new Uint8Array(file) });

    const result = await parser.getText();
    await parser.destroy();

    throw new Error("Method not implemented.");
  }
}