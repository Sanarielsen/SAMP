// import { describe, it, expect, beforeEach } from 'vitest'
// import { InMemoryRepresentativeRepository } from '../src/repositories/in-memory/in-memory-representatives-repository'
// import { InMemoryClientsRepository } from '../src/repositories/in-memory/in-memory-client-repository'
// import { CreateRepresentativeDTO, UpdateRepresentativeDTO } from '@shared/types/representative'

// describe('InMemoryClientsRepository', () => {
//   let clientRepository: InMemoryClientsRepository

//   beforeEach(() => {
//     clientRepository = new InMemoryClientsRepository()
//   })

//   describe('findByIdUserResponsable', () => {
//     it('should find all clients by responsible user id', async () => {
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
//         isActivated: true,
//         createdById: 'user-1',
//         responsibleById: 'user-1',
//         createdAt: new Date(Date.now())
//       })

//       const result = await clientRepository.findByIdUserResponsable('user-1')

//       expect(result).toHaveLength(1)
//       expect(result[0].legalName).toBe('Corp CA')
//     })

//     it('should return empty array when user has no clients', async () => {
//       const result = await clientRepository.findByIdUserResponsable('non-existent-user')

//       expect(result).toEqual([])
//     })

//     it('should only return clients for specific user', async () => {
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
//         isActivated: true,
//         createdById: 'user-1',
//         responsibleById: 'user-1',
//         createdAt: new Date(Date.now())
//       })

//       await clientRepository.create({
//         legalName: 'Corp XYZ',
//         tradeName: 'Comporacao XYZ',
//         type: 1,
//         protocol: '12345678000100',
//         dataFundation: new Date(),
//         locationAddress: 'Rua Outra, 456',
//         correspondenceAddress: 'Rua Outra, 789',
//         nameContact: 'Pedro',
//         numberContact: '98765432100',
//         isActivated: true,
//         createdById: 'user-2',
//         responsibleById: 'user-2',
//         createdAt: new Date(Date.now())
//       })

//       const result = await clientRepository.findByIdUserResponsable('user-1')

//       expect(result).toHaveLength(1)
//       expect(result[0].protocol).toBe('87702517000100')
//     })
//   })

//   describe('updateStatus', () => {
//     it('should update client status to inactive', async () => {
//       const created = await clientRepository.create({
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
//         createdAt: new Date(Date.now())
//       })

//       const result = await clientRepository.updateStatus(created.id, { isActivated: false })

//       expect(result.isActivated).toBe(false)
//       expect(result.updatedAt).toBeDefined()
//     })

//     it('should update client status to active', async () => {
//       const created = await clientRepository.create({
//         legalName: 'Corp CA',
//         tradeName: 'Comporacao de Roupas',
//         type: 2,
//         protocol: '87702517000100',
//         dataFundation: new Date(),
//         locationAddress: 'Rua Beco das Flores, 123',
//         correspondenceAddress: 'Rua Beco das Flores, 321',
//         nameContact: 'Samuel',
//         numberContact: '12341211234',
//         isActivated: false,
//         createdById: 'user-1',
//         responsibleById: 'user-1',
//         createdAt: new Date(Date.now())
//       })

//       const result = await clientRepository.updateStatus(created.id, { isActivated: true })

//       expect(result.isActivated).toBe(true)
//       expect(result.updatedAt).toBeDefined()
//     })
//   })

//   describe('create', () => {
//     it('should create a client with generated id', async () => {
//       const result = await clientRepository.create({
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
//         createdAt: new Date(Date.now())
//       })

//       expect(result.id).toBeDefined()
//       expect(result.legalName).toBe('Corp CA')
//     })

//     it('should create a client with provided id', async () => {
//       const result = await clientRepository.create({
//         id: 'custom-id',
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
//         createdAt: new Date(Date.now())
//       })

//       expect(result.id).toBe('custom-id')
//     })
//   })

//   describe('findById', () => {
//     it('should find a client by id', async () => {
//       const created = await clientRepository.create({
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
//         createdAt: new Date(Date.now())
//       })

//       const result = await clientRepository.findById('client-1')

//       expect(result).not.toBeNull()
//       expect(result?.legalName).toBe('Corp CA')
//     })

//     it('should return null when client not found', async () => {
//       const result = await clientRepository.findById('non-existent')

//       expect(result).toBeNull()
//     })
//   })

//   describe('findByProtocol', () => {
//     it('should find a client by protocol', async () => {
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
//         isActivated: true,
//         createdById: 'user-1',
//         responsibleById: 'user-1',
//         createdAt: new Date(Date.now())
//       })

//       const result = await clientRepository.findByProtocol('87702517000100')

//       expect(result).not.toBeNull()
//       expect(result?.legalName).toBe('Corp CA')
//     })

//     it('should return null when protocol not found', async () => {
//       const result = await clientRepository.findByProtocol('non-existent')

//       expect(result).toBeNull()
//     })
//   })

//   describe('findByIdUserResponsableActivated', () => {
//     it('should find activated clients by responsible user', async () => {
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
//         isActivated: true,
//         createdById: 'user-1',
//         responsibleById: 'user-1',
//         createdAt: new Date(Date.now())
//       })

//       const result = await clientRepository.findByIdUserResponsableActivated('user-1')

//       expect(result).toHaveLength(1)
//       expect(result?.[0].isActivated).toBe(true)
//     })

//     it('should not include inactive clients', async () => {
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
//         isActivated: false,
//         createdById: 'user-1',
//         responsibleById: 'user-1',
//         createdAt: new Date(Date.now())
//       })

//       const result = await clientRepository.findByIdUserResponsableActivated('user-1')

//       expect(result).toEqual([])
//     })
//   })

//   describe('findByIdUserResponsableAndSearch', () => {
//     it('should find clients by user id and legal name search', async () => {
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
//         isActivated: true,
//         createdById: 'user-1',
//         responsibleById: 'user-1',
//         createdAt: new Date(Date.now())
//       })

//       const result = await clientRepository.findByIdUserResponsableAndSearch('user-1', 'Corp')

//       expect(result).toHaveLength(1)
//       expect(result[0].legalName).toBe('Corp CA')
//     })

//     it('should not find clients with non-matching search', async () => {
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
//         isActivated: true,
//         createdById: 'user-1',
//         responsibleById: 'user-1',
//         createdAt: new Date(Date.now())
//       })

//       const result = await clientRepository.findByIdUserResponsableAndSearch('user-1', 'NonExistent')

//       expect(result).toEqual([])
//     })
//   })

//   describe('update', () => {
//     it('should update a client', async () => {
//       const created = await clientRepository.create({
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
//         createdAt: new Date(Date.now())
//       })

//       const result = await clientRepository.update('client-1', { legalName: 'Corp Updated' })

//       expect(result.legalName).toBe('Corp Updated')
//       expect(result.updatedAt).toBeDefined()
//     })
//   })
// })