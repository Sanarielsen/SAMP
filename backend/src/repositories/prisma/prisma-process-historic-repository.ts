import { prisma } from "@/lib/prisma";

import { ProcessHistoricRepository } from "@/repositories/process-historic-repository";
import { formatDateTimeBrazil } from "@/utils/formatSwitchDate";

import { 
  CreateProcessHistoricDTO, 
  DetailsProcessHistoryDTO, 
  ProcessHistoric
} from "@shared/types/processHistoric";
import { OptionsControlledBox } from "@shared/types/values";


export class PrismaProcessHistoricRepository implements ProcessHistoricRepository {
  async create(data: CreateProcessHistoricDTO): Promise<ProcessHistoric | null> {
    return await prisma.processHistoric.create({
      data
    })
  }
  
  delete(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async findById(id: string): Promise<ProcessHistoric | null> {
    return await prisma.processHistoric.findUnique({
      where: {
        id
      }
    })
  }

  async findAsADetailsById(id: string): Promise<DetailsProcessHistoryDTO | null> {
    const processHistoric = await prisma.processHistoric.findUnique({
      where: {
        id
      },
      include: {
        category: true
      }
    })

    if (!processHistoric) return null;

    return {
      fileName: processHistoric.fileName,
      numberMagazine: processHistoric.numberMagazine,
      createdAt: processHistoric.createdAt,
      categoryName: processHistoric.category.name,
    }
  }

  async findManyAsAOption(): Promise<OptionsControlledBox[]> {
    const processHistorics = await prisma.processHistoric.findMany()

    return processHistorics.map( (historic) => ({
      label: historic.fileName + ' - ' + formatDateTimeBrazil(historic.createdAt),
      value: historic.id,
    }))
  }

  async findByNumberMagazine(numberMagazine: string): Promise<ProcessHistoric | null> {
    return await prisma.processHistoric.findUnique({
      where: {
        numberMagazine
      }
    })
  }
}