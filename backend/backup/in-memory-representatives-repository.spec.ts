// import { describe, it, expect, beforeEach } from 'vitest'
// import { InMemoryRepresentativeRepository } from '../src/repositories/in-memory/in-memory-representatives-repository'
// import { InMemoryClientsRepository } from '../src/repositories/in-memory/in-memory-client-repository'
// import { CreateRepresentativeDTO, UpdateRepresentativeDTO } from '@shared/types/representative'

// describe('InMemoryRepresentativeRepository', () => {
//   let representativeRepository: InMemoryRepresentativeRepository
//   let clientRepository: InMemoryClientsRepository

//   beforeEach(() => {
//     clientRepository = new InMemoryClientsRepository()
//     representativeRepository = new InMemoryRepresentativeRepository(clientRepository)
//   })

//   describe('create', () => {
//     it('should create a representative with generated id', async () => {
//       const data: CreateRepresentativeDTO = {
//         clientId: 'client-1',
//         name: 'John Doe',
//         nationality: 'Brazilian',
//         documentRG: '123456789',
//         documentCPF: '12345678901',
//         titleJob: 'Manager',
//         roleJob: 'Sales',
//       }

//       const result = await representativeRepository.create(data)

//       expect(result.id).toBeDefined()
//       expect(result.name).toBe('John Doe')
//       expect(result.createdAt).toBeDefined()
//       expect(result.updatedAt).toBeNull()
//       expect(result.deletedAt).toBeNull()
//     })

//     it('should create a representative with provided id', async () => {
//       const data: CreateRepresentativeDTO = {
//         id: 'custom-id',
//         clientId: 'client-1',
//         name: 'Jane Doe',
//         nationality: 'American',
//         documentRG: '987654321',
//         documentCPF: '10987654321',
//         titleJob: 'Director',
//         roleJob: 'Management',
//       }

//       const result = await representativeRepository.create(data)

//       expect(result.id).toBe('custom-id')
//     })
//   })

//   describe('update', () => {
//     it('should update a representative', async () => {
//       const data: CreateRepresentativeDTO = {
//         id: 'rep-1',
//         clientId: 'client-1',
//         name: 'John Doe',
//         nationality: 'Brazilian',
//         documentRG: '123456789',
//         documentCPF: '12345678901',
//         titleJob: 'Manager',
//         roleJob: 'Sales',
//       }

//       await representativeRepository.create(data)

//       const updateData: UpdateRepresentativeDTO = {
//         id: 'rep-1',
//         name: 'John Updated',
//         nationality: 'Canadian',
//       }

//       const result = await representativeRepository.update(updateData)

//       expect(result.name).toBe('John Updated')
//       expect(result.nationality).toBe('Canadian')
//       expect(result.updatedAt).toBeDefined()
//     })
//   })

//   describe('delete', () => {
//     it('should soft delete a representative', async () => {
//       const data: CreateRepresentativeDTO = {
//         id: 'rep-1',
//         clientId: 'client-1',
//         name: 'John Doe',
//         nationality: 'Brazilian',
//         documentRG: '123456789',
//         documentCPF: '12345678901',
//         titleJob: 'Manager',
//         roleJob: 'Sales',
//       }

//       await representativeRepository.create(data)

//       const result = await representativeRepository.delete('rep-1')

//       expect(result.deletedAt).toBeDefined()
//     })
//   })

//   describe('findById', () => {
//     it('should find a representative by id', async () => {
//       const data: CreateRepresentativeDTO = {
//         id: 'rep-1',
//         clientId: 'client-1',
//         name: 'John Doe',
//         nationality: 'Brazilian',
//         documentRG: '123456789',
//         documentCPF: '12345678901',
//         titleJob: 'Manager',
//         roleJob: 'Sales',
//       }

//       await representativeRepository.create(data)

//       const result = await representativeRepository.findById('rep-1')

//       expect(result).not.toBeNull()
//       expect(result?.name).toBe('John Doe')
//     })

//     it('should return null when representative not found', async () => {
//       const result = await representativeRepository.findById('non-existent')

//       expect(result).toBeNull()
//     })
//   })

//   describe('findManyRepresentsOnClientsId', () => {
//     it('should find representatives by client id', async () => {
//       await clientRepository.create({
//         legalName: 'Corp CA',
//         tradeName: 'Comporacao de Roupas',
//         type: 2,
//         protocol: '87702517000100',
//         dataFundation: new Date(),
//         locationAddress: 'Rua Beco das Flores, 123',
//         correspondenceAddress: 'Rua Beco das Flores, 321',
//         nameContact: 'Samuel',
//         numberContact: '12341211234',
//         createdById: 'user-1',
//         responsibleById: 'user-1',
//         createdAt: new Date(Date.now()),
//         isActivated: true
//       })

//       const clientId = clientRepository.items[0].id

//       await representativeRepository.create({
//         clientId,
//         name: 'John Doe',
//         nationality: 'Brazilian',
//         documentRG: '123456789',
//         documentCPF: '12345678901',
//         titleJob: 'Manager',
//         roleJob: 'Sales',
//       })

//       const result = await representativeRepository.findManyRepresentsOnClientsId(clientId)

//       expect(result).toHaveLength(1)
//       expect(result?.[0].label).toBe('Corp CA')
//     })

//     it('should not include deleted representatives', async () => {
//       await clientRepository.create({
//         legalName: 'Corp CA',
//         tradeName: 'Comporacao de Roupas',
//         type: 2,
//         protocol: '87702517000100',
//         dataFundation: new Date(),
//         locationAddress: 'Rua Beco das Flores, 123',
//         correspondenceAddress: 'Rua Beco das Flores, 321',
//         nameContact: 'Samuel',
//         numberContact: '12341211234',
//         createdById: 'user-1',
//         responsibleById: 'user-1',
//         createdAt: new Date(Date.now()),
//         isActivated: false
//       })

//       const clientId = clientRepository.items[0].id

//       const rep = await representativeRepository.create({
//         id: 'rep-1',
//         clientId,
//         name: 'John Doe',
//         nationality: 'Brazilian',
//         documentRG: '123456789',
//         documentCPF: '12345678901',
//         titleJob: 'Manager',
//         roleJob: 'Sales',
//       })

//       await representativeRepository.delete('rep-1')

//       const result = await representativeRepository.findManyRepresentsOnClientsId(clientId)

//       expect(result).toHaveLength(0)
//     })

//     it('should return empty array when no representatives found', async () => {
//       const result = await representativeRepository.findManyRepresentsOnClientsId('non-existent')

//       expect(result).toEqual([])
//     })
//   })

//   describe('findByIdUserWithSearchRepresentativesOnlyClientsActivated', () => {
//     it('should find representatives by user id with matching nationality', async () => {
//       await clientRepository.create({
//         id: 'client-1',
//         legalName: 'Corp CA',
//         tradeName: 'Comporacao de Roupas',
//         type: 2,
//         protocol: '87702517000100',
//         dataFundation: new Date(),
//         locationAddress: 'Rua Beco das Flores, 123',
//         correspondenceAddress: 'Rua Beco das Flores, 321',
//         nameContact: 'Samuel',
//         numberContact: '12341211234',
//         isActivated: true,
//         createdById: 'user-1',
//         responsibleById: 'user-1',
//         createdAt: new Date(Date.now()),
//       })

//       await representativeRepository.create({
//         clientId: 'client-1',
//         name: 'John Doe',
//         nationality: 'Brazilian',
//         documentRG: '123456789',
//         documentCPF: '12345678901',
//         titleJob: 'Manager',
//         roleJob: 'Sales',
//       })

//       const result = await representativeRepository.findByIdUserWithSearchRepresentativesOnlyClientsActivated(
//         'user-1',
//         'Brazil'
//       )

//       expect(result).toHaveLength(1)
//     })

//     it('should not find representatives with non-matching nationality', async () => {
//       await clientRepository.create({
//         id: 'client-1',
//         legalName: 'Corp CA',
//         tradeName: 'Comporacao de Roupas',
//         type: 2,
//         protocol: '87702517000100',
//         dataFundation: new Date(),
//         locationAddress: 'Rua Beco das Flores, 123',
//         correspondenceAddress: 'Rua Beco das Flores, 321',
//         nameContact: 'Samuel',
//         numberContact: '12341211234',
//         isActivated: true,
//         createdById: 'user-1',
//         responsibleById: 'user-1',
//         createdAt: new Date(Date.now()),
//       })

//       await representativeRepository.create({
//         clientId: 'client-1',
//         name: 'John Doe',
//         nationality: 'Brazilian',
//         documentRG: '123456789',
//         documentCPF: '12345678901',
//         titleJob: 'Manager',
//         roleJob: 'Sales',
//       })

//       const result = await representativeRepository.findByIdUserWithSearchRepresentativesOnlyClientsActivated(
//         'user-1',
//         'American'
//       )

//       expect(result).toHaveLength(0)
//     })

//     it('should not include deleted representatives', async () => {
//       await clientRepository.create({
//         id: 'client-1',
//         legalName: 'Corp CA',
//         tradeName: 'Comporacao de Roupas',
//         type: 2,
//         protocol: '87702517000100',
//         dataFundation: new Date(),
//         locationAddress: 'Rua Beco das Flores, 123',
//         correspondenceAddress: 'Rua Beco das Flores, 321',
//         nameContact: 'Samuel',
//         numberContact: '12341211234',
//         isActivated: true,
//         createdById: 'user-1',
//         responsibleById: 'user-1',
//         createdAt: new Date(Date.now()),
//       })

//       const rep = await representativeRepository.create({
//         id: 'rep-1',
//         clientId: 'client-1',
//         name: 'John Doe',
//         nationality: 'Brazilian',
//         documentRG: '123456789',
//         documentCPF: '12345678901',
//         titleJob: 'Manager',
//         roleJob: 'Sales',
//       })

//       await representativeRepository.delete('rep-1')

//       const result = await representativeRepository.findByIdUserWithSearchRepresentativesOnlyClientsActivated(
//         'user-1',
//         'Brazil'
//       )

//       expect(result).toHaveLength(0)
//     })

//     it('should be case insensitive when searching', async () => {
//       await clientRepository.create({
//         id: 'client-1',
//         legalName: 'Corp CA',
//         tradeName: 'Comporacao de Roupas',
//         type: 2,
//         protocol: '87702517000100',
//         dataFundation: new Date(),
//         locationAddress: 'Rua Beco das Flores, 123',
//         correspondenceAddress: 'Rua Beco das Flores, 321',
//         nameContact: 'Samuel',
//         numberContact: '12341211234',
//         isActivated: true,
//         createdById: 'user-1',
//         responsibleById: 'user-1',
//         createdAt: new Date(Date.now()),
//       })

//       await representativeRepository.create({
//         clientId: 'client-1',
//         name: 'John Doe',
//         nationality: 'Brazilian',
//         documentRG: '123456789',
//         documentCPF: '12345678901',
//         titleJob: 'Manager',
//         roleJob: 'Sales',
//       })

//       const result = await representativeRepository.findByIdUserWithSearchRepresentativesOnlyClientsActivated(
//         'user-1',
//         'BRAZILIAN'
//       )

//       expect(result).toHaveLength(1)
//     })
//   })

//   describe('findManyByUserIdWithSearch', () => {
//     it('should find representatives by user id with matching name', async () => {
//       await clientRepository.create({
//         id: 'client-1',
//         legalName: 'Corp CA',
//         tradeName: 'Comporacao de Roupas',
//         type: 2,
//         protocol: '87702517000100',
//         dataFundation: new Date(),
//         locationAddress: 'Rua Beco das Flores, 123',
//         correspondenceAddress: 'Rua Beco das Flores, 321',
//         nameContact: 'Samuel',
//         numberContact: '12341211234',
//         isActivated: true,
//         createdById: 'user-1',
//         responsibleById: 'user-1',
//         createdAt: new Date(Date.now()),
//       })

//       await representativeRepository.create({
//         clientId: 'client-1',
//         name: 'John Doe',
//         nationality: 'Brazilian',
//         documentRG: '123456789',
//         documentCPF: '12345678901',
//         titleJob: 'Manager',
//         roleJob: 'Sales',
//       })

//       const result = await representativeRepository.findManyByUserIdWithSearch('user-1', 'John')

//       expect(result).toHaveLength(1)
//       expect(result?.[0].name).toBe('John Doe')
//     })

//     it('should not find representatives with non-matching name', async () => {
//       await clientRepository.create({
//         id: 'client-1',
//         legalName: 'Corp CA',
//         tradeName: 'Comporacao de Roupas',
//         type: 2,
//         protocol: '87702517000100',
//         dataFundation: new Date(),
//         locationAddress: 'Rua Beco das Flores, 123',
//         correspondenceAddress: 'Rua Beco das Flores, 321',
//         nameContact: 'Samuel',
//         numberContact: '12341211234',
//         isActivated: true,
//         createdById: 'user-1',
//         responsibleById: 'user-1',
//         createdAt: new Date(Date.now()),
//       })

//       await representativeRepository.create({
//         clientId: 'client-1',
//         name: 'John Doe',
//         nationality: 'Brazilian',
//         documentRG: '123456789',
//         documentCPF: '12345678901',
//         titleJob: 'Manager',
//         roleJob: 'Sales',
//       })

//       const result = await representativeRepository.findManyByUserIdWithSearch('user-1', 'Jane')

//       expect(result).toEqual([])
//     })

//     it('should return empty array when user has no clients', async () => {
//       const result = await representativeRepository.findManyByUserIdWithSearch('non-existent-user', 'John')

//       expect(result).toEqual([])
//     })

//     it('should find multiple representatives for user', async () => {
//       await clientRepository.create({
//         id: 'client-1',
//         legalName: 'Corp CA',
//         tradeName: 'Comporacao de Roupas',
//         type: 2,
//         protocol: '87702517000100',
//         dataFundation: new Date(),
//         locationAddress: 'Rua Beco das Flores, 123',
//         correspondenceAddress: 'Rua Beco das Flores, 321',
//         nameContact: 'Samuel',
//         numberContact: '12341211234',
//         isActivated: true,
//         createdById: 'user-1',
//         responsibleById: 'user-1',
//         createdAt: new Date(Date.now()),
//       })

//       await representativeRepository.create({
//         clientId: 'client-1',
//         name: 'John Doe',
//         nationality: 'Brazilian',
//         documentRG: '123456789',
//         documentCPF: '12345678901',
//         titleJob: 'Manager',
//         roleJob: 'Sales',
//       })

//       await representativeRepository.create({
//         clientId: 'client-1',
//         name: 'John Smith',
//         nationality: 'American',
//         documentRG: '987654321',
//         documentCPF: '10987654321',
//         titleJob: 'Director',
//         roleJob: 'Management',
//       })

//       const result = await representativeRepository.findManyByUserIdWithSearch('user-1', 'John')

//       expect(result).toHaveLength(2)
//     })

//     it('should not find representatives from other users clients', async () => {
//       await clientRepository.create({
//         id: 'client-1',
//         legalName: 'Corp CA',
//         tradeName: 'Comporacao de Roupas',
//         type: 2,
//         protocol: '87702517000100',
//         dataFundation: new Date(),
//         locationAddress: 'Rua Beco das Flores, 123',
//         correspondenceAddress: 'Rua Beco das Flores, 321',
//         nameContact: 'Samuel',
//         numberContact: '12341211234',
//         isActivated: true,
//         createdById: 'user-1',
//         responsibleById: 'user-1',
//         createdAt: new Date(Date.now()),
//       })

//       await representativeRepository.create({
//         clientId: 'client-1',
//         name: 'John Doe',
//         nationality: 'Brazilian',
//         documentRG: '123456789',
//         documentCPF: '12345678901',
//         titleJob: 'Manager',
//         roleJob: 'Sales',
//       })

//       const result = await representativeRepository.findManyByUserIdWithSearch('user-2', 'John')

//       expect(result).toEqual([])
//     })
//   })
// })