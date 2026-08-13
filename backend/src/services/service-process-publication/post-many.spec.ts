import { 
  beforeEach,
  describe,
  expect,
  it 
} from "vitest";

import { PostManyProcessPublicationUseCase } from "@/services/service-process-publication/post-many";
import { InMemoryUserRoleRepository } from "@/repositories/in-memory/in-memory-user-role-repository";
import { InMemoryUserRepository } from "@/repositories/in-memory/in-memory-user-repository";
import { InMemoryImportedProcessRepository } from "@/repositories/in-memory/in-memory-imported-process-repository";
import { InMemoryProcessPublicationRepository } from "@/repositories/in-memory/in-memory-process-publication-repository";
import { makeUserRole } from "@/services/factories/user-role/make-entity";
import { makeUser } from "@/services/factories/user/make-entity";
import { makeImportedProcess } from "@/services/factories/imported-process/make-entity";
import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error";
import { UnauthorizedUserError } from "@/services/errors/unauthorized-user-error";

import { UserRole } from "@shared/types/userRole";
import { User } from "@shared/types/user";
import { ImportedProcess } from "@shared/types/importedProcess";


let userRoleRepository: InMemoryUserRoleRepository
let userRepository: InMemoryUserRepository
let importedProcessRepository: InMemoryImportedProcessRepository
let processPublicationRepository: InMemoryProcessPublicationRepository
let sut: PostManyProcessPublicationUseCase

let newUserRoleAdmin: UserRole
let newUserAdmin: User
let newImportedProcess: ImportedProcess

describe('Post Process Publication Adaptative Use Case', () => {
  beforeEach( async () => {
    userRoleRepository = new InMemoryUserRoleRepository();
    userRepository = new InMemoryUserRepository();
    importedProcessRepository = new InMemoryImportedProcessRepository();
    processPublicationRepository = new InMemoryProcessPublicationRepository();

    sut = new PostManyProcessPublicationUseCase(
      userRoleRepository,
      userRepository,
      importedProcessRepository,
      processPublicationRepository,
    );

    newUserRoleAdmin = await makeUserRole( userRoleRepository, {
      name: 'ADMIN-TEST',
      level: 1
    })

    newUserAdmin = await makeUser( userRepository, {
      name: 'USER-TEST',
      roleId: newUserRoleAdmin.id
    })

    newImportedProcess = await makeImportedProcess( importedProcessRepository, {
      createdByUser: newUserAdmin.id
    })

  })

  it('should create publications', async () => {

    const insertedPublications = await sut.execute({
      createdByUser: newUserAdmin.id,
      importedProcessId: newImportedProcess.id,
      publications: [
        {
          magazineNumber: '123',
          publicationDate: '22/10/2020',
          certificate: 'certificate-test',
          complement: 'complement-test',
          description: 'description-test',
          dispatch: 'dispatch-test',
          entireSource: 'ENTIRE'
        },
        {
          magazineNumber: '1234',
          publicationDate: '23/10/2020',
          certificate: 'certificate-test',
          complement: 'complement-test',
          description: 'description-test',
          dispatch: 'dispatch-test',
          entireSource: 'ENTIRE'
        }
      ]
    })

    expect(insertedPublications).toBe(2)
  })

  it('should not create any publication using user with invalid user role', async () => {

    const newUserWithRoleNonExistent = await makeUser( userRepository, {
      name: 'USER-TEST',
      roleId: 'invalid-user-role'
    })

    await expect(() => sut.execute({
      createdByUser: newUserWithRoleNonExistent.id,
      importedProcessId: newImportedProcess.id,
      publications: [
        {
          magazineNumber: '123',
          publicationDate: '22/10/2020',
          certificate: 'certificate-test',
          complement: 'complement-test',
          description: 'description-test',
          dispatch: 'dispatch-test',
          entireSource: 'ENTIRE'
        }
      ]
    })).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('should not create any publication with non-existent user', async () => {
    await expect(() => sut.execute({
      createdByUser: 'non-existent-user',
      importedProcessId: newImportedProcess.id,
      publications: [
        {
          magazineNumber: '123',
          publicationDate: '22/10/2020',
          certificate: 'certificate-test',
          complement: 'complement-test',
          description: 'description-test',
          dispatch: 'dispatch-test',
          entireSource: 'ENTIRE'
        }
      ]
    })).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('should not create any publication using user non-admin', async () => {

    const newUserRoleNonAdmin = await makeUserRole( userRoleRepository, {
      name: 'USER-ROLE-NON-ADMIN',
      level: 2
    })
    
    const newUserWithRoleNonAdmin = await makeUser( userRepository, {
      name: 'USER-TEST',
      roleId: newUserRoleNonAdmin.id
    })

    await expect(() => sut.execute({
      createdByUser: newUserWithRoleNonAdmin.id,
      importedProcessId: newImportedProcess.id,
      publications: [
        {
          magazineNumber: '123',
          publicationDate: '22/10/2020',
          certificate: 'certificate-test',
          complement: 'complement-test',
          description: 'description-test',
          dispatch: 'dispatch-test',
          entireSource: 'ENTIRE'
        }
      ]
    })).rejects.toBeInstanceOf(UnauthorizedUserError)
  })

  it('should not create any publication with non-existent imported process', async () => {
    
    await expect(() => sut.execute({
      createdByUser: newUserAdmin.id,
      importedProcessId: 'non-existent-imported-process',
      publications: [
        {
          magazineNumber: '123',
          publicationDate: '22/10/2020',
          certificate: 'certificate-test',
          complement: 'complement-test',
          description: 'description-test',
          dispatch: 'dispatch-test',
          entireSource: 'ENTIRE'
        }
      ]
    })).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})