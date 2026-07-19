import { prisma } from "@/lib/prisma";

import { ProcessHistoryRepository } from "@/repositories/process-historic-repository";
import { formatDateTimeBrazil } from "@/utils/formatSwitchDate";

import { 
  CreateProcessHistoricDTO, 
  ProcessHistoryDetailDTO, 
  ProcessHistory
} from "@shared/types/processHistory";
import { OptionsControlledBox } from "@shared/types/values";


export class PrismaProcessHistoryRepository implements ProcessHistoryRepository {
  async create(data: CreateProcessHistoricDTO): Promise<ProcessHistory> {
    return await prisma.processHistory.create({
      data
    })
  }
  
  async delete(id: string): Promise<void> {
    await prisma.processHistory.delete({
      where: { id }
    })
  }

  async findById(id: string): Promise<ProcessHistory | null> {
    return await prisma.processHistory.findUnique({
      where: {
        id
      }
    })
  }

  async findAsADetailsById(id: string): Promise<ProcessHistoryDetailDTO | null> {
    const processHistoric = await prisma.processHistory.findUnique({
      where: {
        id
      },
      include: {
        category: true
      }
    })

    if (!processHistoric) return null;

    return {
      id: processHistoric.id,
      fileName: processHistoric.fileName,
      numberMagazine: processHistoric.numberMagazine,
      createdAt: processHistoric.createdAt,
      categoryName: processHistoric.category.name,
    }
  }

  async findManyWithDetails(): Promise<ProcessHistoryDetailDTO[]> {
    const processHistories = await prisma.processHistory.findMany({
      include: {
        category: true
      }
    })

    return processHistories.map( (history) => ({
      id: history.id,
      numberMagazine: history.numberMagazine,
      categoryName: history.category.name,
      fileName: history.fileName,
      filePath: history.filePath,
      createdAt: history.createdAt,
    }))
  }

  async findManyAsAOption(): Promise<OptionsControlledBox[]> {
    const processHistorics = await prisma.processHistory.findMany()

    return processHistorics.map( (historic) => ({
      label: historic.fileName + ' - ' + formatDateTimeBrazil(historic.createdAt),
      value: historic.id,
    }))
  }

  async findByNumberMagazine(numberMagazine: string): Promise<ProcessHistory | null> {
    return await prisma.processHistory.findUnique({
      where: {
        numberMagazine
      }
    })
  }
}