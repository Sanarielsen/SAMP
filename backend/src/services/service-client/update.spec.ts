import { describe, beforeEach, it, expect } from "vitest";

import { InMemoryClientsRepository } from "@/repositories/in-memory/in-memory-client-repository";
import { UpdateClientUseCase } from "@/services/service-client/update";

import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error";

let clientRepository: InMemoryClientsRepository
let sut: UpdateClientUseCase

describe('Update Client Use Case', () => {
  beforeEach(() => {
    clientRepository = new InMemoryClientsRepository()
    sut = new UpdateClientUseCase(clientRepository)
  })

  it('should update a client that already exists in the database', async () => {
    
    await clientRepository.create({
      id: 'client-1',
      legalName: 'Sanarielsen LTDA',
      tradeName: 'Sanarielsen',
      type: 1,
      protocol: '12345678912345',
      dataFundation: new Date(),
      locationAddress: 'Old Address',
      correspondenceAddress: 'Old Address',
      nameContact: 'Samuel',
      numberContact: '11999999999',
      isActivated: true,
      createdAt: new Date(),
      createdById: 'user-1',
      responsibleById: 'user-1',
    })

    const clientUpdated = await sut.execute({
      id: 'client-1',
      tradeName: 'New Trade Name',
      locationAddress: 'New Address',
    })

    expect(clientUpdated.tradeName)
      .toBe('New Trade Name')

    expect(clientUpdated.locationAddress)
      .toBe('New Address')

    expect(clientUpdated.id)
      .toBe('client-1')

    expect(clientUpdated.updatedAt)
      .toEqual(expect.any(Date))
  })

  it('should not be able to update a non-existing client', async () => {

    await expect(() =>
      sut.execute({
        id: 'non-existing-client',
        tradeName: 'New Name',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})