import { prisma } from "@/lib/prisma";

import { ProcessRepository } from "@/repositories/process-repository";

import { CreatedProcessImportedDTO } from "@shared/types/process";


export class PrismaProcessRepository implements ProcessRepository {
  async createManyAsImport(importedProcesses: CreatedProcessImportedDTO[]): Promise<number> {
    const { count } = await prisma.importedProcess.createMany({
      data: importedProcesses.map(process => ({
        ...process,
        createdAt: new Date(),
        updatedAt: null,
        deletedAt: null,
      })),
      skipDuplicates: true,
    })

    return count;
  }
}