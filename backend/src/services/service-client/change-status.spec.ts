import { beforeEach, describe, expect, it } from "vitest"

import { InMemoryClientsRepository } from "@/repositories/in-memory/in-memory-client-repository"
import { UpdateClientStatusUseCase } from "@/services/service-client/change-status"

import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error"

let clientRepository: InMemoryClientsRepository
let sut: UpdateClientStatusUseCase

describe('Update Status Client Use Case', () => {
  beforeEach(() => {
    clientRepository = new InMemoryClientsRepository()
    sut = new UpdateClientStatusUseCase(clientRepository)
  })

  it('should be able to change client status', async () => {
    await clientRepository.create({
      id: 'client-1',
      legalName: 'Client Test',
      tradeName: 'Client',
      type: 1,
      protocol: '123',
      dataFundation: new Date(),
      locationAddress: 'Address',
      correspondenceAddress: 'Address',
      nameContact: 'Samuel',
      numberContact: '11999999999',
      isActivated: true,
      createdAt: new Date(),
      createdById: 'user-1',
      responsibleById: 'user-1',
    })

    const updatedClient = await sut.execute({
      id: 'client-1',
      isActivated: false,
    })

    expect(updatedClient.isActivated).toBe(false)
  })

  it('should not update a non-existing client', async () => {

    await expect(() =>
      sut.execute({
        id: 'non-existing-client',
        isActivated: false,
      }),
    ).rejects.toBeInstanceOf(
      ResourceNotFoundError,
    )
  })

})