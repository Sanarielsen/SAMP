import { prisma } from "@/lib/prisma";

import { ProcessHistoricRepository } from "../process-historic-repository";
import { CreateProcessHistoricDTO, ProcessHistoric } from "@shared/types/processHistoric";


export class PrismaProcessHistoricRepository implements ProcessHistoricRepository {
  async create(data: CreateProcessHistoricDTO): Promise<ProcessHistoric | null> {
    return await prisma.processHistoric.create({
      data
    })
  }
  delete(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async findByNumberMagazine(numberMagazine: string): Promise<ProcessHistoric | null> {
    return prisma.processHistoric.findUnique({
      where: {
        numberMagazine
      }
    })
  }
}