import { 
  beforeEach,
  describe,
  expect,
  it,
  vi
} from "vitest";

import { ListProcessPublicationFromINPIUseCase } from "@/services/service-process-publication/list-from-inpi";
import { InMemoryUserRoleRepository } from "@/repositories/in-memory/in-memory-user-role-repository";
import { InMemoryUserRepository } from "@/repositories/in-memory/in-memory-user-repository";
import { InMemoryImportedProcessRepository } from "@/repositories/in-memory/in-memory-imported-process-repository";
import { makeUserRole } from "@/services/factories/user-role/make-entity";
import { makeUser } from "@/services/factories/user/make-entity";
import { makeImportedProcess } from "@/services/factories/imported-process/make-entity";
import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error";
import { UnauthorizedUserError } from "@/services/errors/unauthorized-user-error";
import * as parsers from "@/utils/parseSearchProcessFromINPI";

import { UserRole } from "@shared/types/userRole";
import { User } from "@shared/types/user";
import { ImportedProcess } from "@shared/types/importedProcess";
import { ProcessPublicationFromINPI } from "@shared/types/processPublication";


class FakeINPIClient {
  async login() { /* noop */ }
  async search(_processNumber: string) { return "<html>search</html>"; }
  async detail(_pedidoNumber: string) { return "<html>detail</html>"; }
}

let userRoleRepository: InMemoryUserRoleRepository
let userRepository: InMemoryUserRepository
let importedProcessRepository: InMemoryImportedProcessRepository
let inpiClient = new FakeINPIClient();
let sut: ListProcessPublicationFromINPIUseCase
let newUserRole: UserRole
let newUser: User
let newImportedProcess: ImportedProcess

describe('Get From INPI Process Publication Use Case', () => {
  beforeEach( async () => {
    userRoleRepository = new InMemoryUserRoleRepository()
    userRepository = new InMemoryUserRepository()
    importedProcessRepository = new InMemoryImportedProcessRepository()
    inpiClient = new FakeINPIClient()
    sut = new ListProcessPublicationFromINPIUseCase(
      userRoleRepository,
      userRepository,
      importedProcessRepository,
      //TODO: Verify why this error after;
      inpiClient
    )

    newUserRole = await makeUserRole( userRoleRepository, {
      name: 'ADMIN',
      level: 1
    } )

    newUser = await makeUser( userRepository, {
      name: 'user-admin',
      roleId: newUserRole.id
    })

    newImportedProcess = await makeImportedProcess(
      importedProcessRepository,
      {
        createdByUser: newUser.id
      }
    )
  })

  it('should list publication of valid process', async () => {

    const role = await makeUserRole(userRoleRepository, { name: "ADMIN", level: 1 });
    const user = await makeUser(userRepository, { roleId: role.id });
    const imported = await makeImportedProcess(importedProcessRepository, { createdByUser: user.id });

    const fakePublications: ProcessPublicationFromINPI[] = [
      { date: "2026-08-01", description: "pub1" } as any
    ];

    vi.spyOn(parsers, "parseSearchProcessFromINPI").mockReturnValue({ pedidoNumber: "PED-123" } as any);
    vi.spyOn(parsers, "parsePublicationsFromINPI").mockReturnValue(fakePublications);

    const res = await sut.execute(imported.processNumber, user.id);
    expect(res).toEqual(fakePublications);
  })

  it('should not list publication with non-existent role', async () => {

    const userWithNonExistentRole = await makeUser(userRepository, { roleId: 'non-existent-role' });

    await expect(() => sut.execute(
      newImportedProcess.processNumber,
      userWithNonExistentRole.id
    )).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
  
  it('should not list publication with non-existent user', async () => {
    await expect(() => sut.execute(
      newImportedProcess.processNumber,
      'user-non-existent'
    )).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('should not list publication with user not admin', async () => {

    const userRoleNonAdmin = await makeUserRole(userRoleRepository, { level: 2 });

    const userNonAdmin = await makeUser(userRepository, { roleId: userRoleNonAdmin.id });

    await expect(() => sut.execute(
      newImportedProcess.processNumber,
      userNonAdmin.id
    )).rejects.toBeInstanceOf(UnauthorizedUserError)
  })

  it('should not list publication of invalid imported process', async () => {
    await expect(() => sut.execute(
      'non-existent-imported-process',
      newUser.id
    )).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  //TODO: Test the line 39
})