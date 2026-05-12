import { beforeEach, describe, expect, it } from "vitest"
import { UpdateClientStatusUseCase } from "./change-status-client"
import { InMemoryClientsRepository } from "@/repositories/in-memory/in-memory-client-repository"
import { ResourceNotFoundError } from "./errors/resource-not-found-error"

let clientRepository: InMemoryClientsRepository
let sut: UpdateClientStatusUseCase

describe('Get User Profile Use Case', () => {
  beforeEach(() => {
    clientRepository = new InMemoryClientsRepository()
    sut = new UpdateClientStatusUseCase(clientRepository)
  })

  it('should update client status', async () => {

    await clientRepository.create({
      id: 'client-1',
      legalName: 'Client Test',
      tradeName: 'Client Test',
      type: 1,
      protocol: '123456789',
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

    const clientUpdated =
      await clientRepository.updateStatus(
        'client-1',
        {
          isActivated: false,
        },
      )

    expect(clientUpdated.isActivated)
      .toBe(false)

    expect(clientUpdated.updatedAt)
      .toEqual(expect.any(Date))

    expect(clientUpdated.id)
      .toBe('client-1')
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