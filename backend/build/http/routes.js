"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/http/routes.ts
var routes_exports = {};
__export(routes_exports, {
  appRoutes: () => appRoutes
});
module.exports = __toCommonJS(routes_exports);

// src/http/Controllers/authenticate.ts
var import_zod2 = require("zod");

// src/services/errors/invalid-credentials-error.ts
var InvalidCredentialsError = class extends Error {
  constructor() {
    super("Invalid credentials.");
  }
};

// src/env/index.ts
var import_config = require("dotenv/config");
var import_zod = require("zod");
var envSchema = import_zod.z.object({
  NODE_ENV: import_zod.z.enum(["dev", "test", "production"]).default("dev"),
  JWT_SECRET: import_zod.z.string(),
  PORT: import_zod.z.coerce.number().default(3333),
  DATABASE_URL: import_zod.z.string().url()
});
var _env = envSchema.safeParse(process.env);
if (_env.success === false) {
  console.error("Invalid enviroment variables", _env.error.format());
  throw new Error("Invalid enviroment variables.");
}
var env = _env.data;

// src/lib/prisma.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient({
  log: env.NODE_ENV === "dev" ? ["query"] : []
});

// src/repositories/prisma/prisma-users-repository.ts
var PrismaUsersRepository = class {
  async findById(id) {
    const user = await prisma.user.findUnique({
      where: {
        id
      }
    });
    return user;
  }
  async findByEmail(email) {
    const user = await prisma.user.findUnique({
      where: {
        email
      }
    });
    return user;
  }
  async create(data) {
    const user = await prisma.user.create({
      data
    });
    return user;
  }
};

// src/services/service-user/authenticate.ts
var import_bcryptjs = require("bcryptjs");
var AuthenticateUseCase = class {
  constructor(usersRepository) {
    this.usersRepository = usersRepository;
  }
  async execute({
    email,
    password
  }) {
    const user = await this.usersRepository.findByEmail(email);
    if (!user) {
      throw new InvalidCredentialsError();
    }
    const doesPasswordMatches = await (0, import_bcryptjs.compare)(password, user.password_hash);
    if (!doesPasswordMatches) {
      throw new InvalidCredentialsError();
    }
    return {
      user
    };
  }
};

// src/services/factories/make-authenticate-use-case.ts
function makeAuthenticateUseCase() {
  const usersRepository = new PrismaUsersRepository();
  const authenticateUseCase = new AuthenticateUseCase(usersRepository);
  return authenticateUseCase;
}

// src/http/Controllers/authenticate.ts
async function authenticate(request, reply) {
  const authenticateBodySchema = import_zod2.z.object({
    email: import_zod2.z.string(),
    password: import_zod2.z.string().min(6)
  });
  const { email, password } = authenticateBodySchema.parse(request.body);
  try {
    const authenticateUseCase = makeAuthenticateUseCase();
    const { user } = await authenticateUseCase.execute({
      email,
      password
    });
    const token = await reply.jwtSign({}, {
      sign: {
        sub: user.id
      }
    });
    return reply.status(200).send({
      token
    });
  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: err.message });
    }
    throw err;
  }
}

// src/services/errors/resource-not-found-error.ts
var ResourceNotFoundError = class extends Error {
  constructor() {
    super("Resource not found.");
  }
};

// src/services/service-user/get-profile.ts
var GetUserProfileUseCase = class {
  constructor(usersRepository) {
    this.usersRepository = usersRepository;
  }
  async execute({
    userId
  }) {
    const user = await this.usersRepository.findById(userId);
    if (!user) {
      throw new ResourceNotFoundError();
    }
    return {
      user
    };
  }
};

// src/services/factories/make-get-user-profile-use-case.ts
function makeGetUserProfileUseCase() {
  const usersRepository = new PrismaUsersRepository();
  const GetProfileUseCase = new GetUserProfileUseCase(usersRepository);
  return GetProfileUseCase;
}

// src/http/Controllers/profile.ts
async function profile(request, reply) {
  const getUserProfile = makeGetUserProfileUseCase();
  const profile2 = await getUserProfile.execute({
    userId: request.user.sub
  });
  return reply.status(200).send({
    user: {
      ...profile2,
      password_hash: void 0
    }
  });
}

// src/http/Controllers/register.ts
var import_zod3 = require("zod");

// src/services/service-user/register.ts
var import_bcryptjs2 = require("bcryptjs");

// src/services/errors/user-already-exists.ts
var UserAlreadyExistsError = class extends Error {
  constructor() {
    super("E-mail already exists");
  }
};

// src/services/service-user/register.ts
var RegisterUseCase = class {
  constructor(usersRepository) {
    this.usersRepository = usersRepository;
  }
  async execute({
    name,
    email,
    password
  }) {
    const password_hash = await (0, import_bcryptjs2.hash)(password, 6);
    const userWithSameEmail = await this.usersRepository.findByEmail(email);
    if (userWithSameEmail) {
      throw new UserAlreadyExistsError();
    }
    const user = await this.usersRepository.create({
      name,
      email,
      password_hash
    });
    return {
      user
    };
  }
};

// src/services/factories/make-register-use-case.ts
function makeRegisterUseCase() {
  const usersRepository = new PrismaUsersRepository();
  const registerUseCase = new RegisterUseCase(usersRepository);
  return registerUseCase;
}

// src/http/Controllers/register.ts
async function register(request, reply) {
  const registerBodySchema = import_zod3.z.object({
    name: import_zod3.z.string(),
    email: import_zod3.z.string(),
    password: import_zod3.z.string().min(6)
  });
  const { name, email, password } = registerBodySchema.parse(request.body);
  try {
    const registerUseCase = makeRegisterUseCase();
    await registerUseCase.execute({
      name,
      email,
      password
    });
  } catch (err) {
    if (err instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: err.message });
    }
    throw err;
  }
  return reply.status(201).send();
}

// src/http/middlewares/verify-jwt.ts
async function verifyJWT(request, reply) {
  try {
    await request.jwtVerify();
  } catch (err) {
    return reply.status(401).send({ message: "Unauthorized." });
  }
}

// src/http/Controllers/client.ts
var import_zod4 = require("zod");

// src/repositories/prisma/prisma-client-repository.ts
var PrismaClientRepository = class {
  async findByIdUserResponsableActivated(idUser) {
    const clients = await prisma.client.findMany({
      where: {
        responsibleById: idUser,
        isActivated: true
      }
    });
    return clients;
  }
  async findByIdUserResponsableAndSearch(idUser, search) {
    const clients = await prisma.client.findMany({
      where: {
        responsibleById: idUser,
        isActivated: true,
        OR: [
          {
            legalName: {
              contains: search,
              mode: "insensitive"
            }
          },
          {
            tradeName: {
              contains: search,
              mode: "insensitive"
            }
          },
          {
            protocol: {
              contains: search,
              mode: "insensitive"
            }
          }
        ]
      }
    });
    return clients;
  }
  async findById(id) {
    const client = await prisma.client.findUnique({
      where: {
        id
      }
    });
    return client;
  }
  async findByProtocol(protocol) {
    return await prisma.client.findUnique({
      where: {
        protocol
      }
    });
  }
  async create(data) {
    const client = await prisma.client.create({
      data
    });
    return client;
  }
  async update(id, data) {
    const client = await prisma.client.update({
      where: {
        id
      },
      data
    });
    return client;
  }
  async updateStatus(id, data) {
    return prisma.client.update({
      where: {
        id
      },
      data
    });
  }
};

// src/services/service-client/change-status.ts
var UpdateClientStatusUseCase = class {
  constructor(clientRepository) {
    this.clientRepository = clientRepository;
  }
  async execute({
    id,
    isActivated
  }) {
    const client = await this.clientRepository.findById(id);
    if (!client) {
      throw new ResourceNotFoundError();
    }
    const updatedClient = await this.clientRepository.update(id, {
      isActivated
    });
    return updatedClient;
  }
};

// src/services/factories/make-change-status-client-use-case.ts
function makeChangeStatusClientUseCase() {
  const clientRepository = new PrismaClientRepository();
  const useCase = new UpdateClientStatusUseCase(clientRepository);
  return useCase;
}

// src/services/errors/resource-already-exists-error.ts
var ResourceAlreadyExistsError = class extends Error {
  constructor() {
    super("Resource already exists");
  }
};

// src/services/errors/non-exist-user-error.ts
var NonExistUserError = class extends Error {
  constructor() {
    super("User sent is not valid.");
  }
};

// src/services/service-client/post.ts
var CreateClientUseCase = class {
  constructor(clientRepository, userRepository) {
    this.clientRepository = clientRepository;
    this.userRepository = userRepository;
  }
  async execute({
    idUser,
    legalName,
    tradeName,
    type,
    protocol,
    dataFundation,
    locationAddress,
    correspondenceAddress,
    nameContact,
    numberContact,
    isActivated
  }) {
    const userLogged = await this.userRepository.findById(idUser);
    if (!userLogged) {
      throw new NonExistUserError();
    }
    const clientWithSameProtocol = await this.clientRepository.findByProtocol(protocol);
    if (clientWithSameProtocol) {
      throw new ResourceAlreadyExistsError();
    }
    const client = await this.clientRepository.create({
      legalName,
      tradeName,
      type,
      protocol,
      dataFundation,
      locationAddress: String(locationAddress),
      correspondenceAddress: String(correspondenceAddress),
      nameContact: String(nameContact),
      numberContact: String(numberContact),
      isActivated,
      createdAt: new Date(Date.now()),
      createdById: idUser,
      responsibleById: idUser
    });
    return {
      client
    };
  }
};

// src/services/factories/make-create-client-use-case.ts
function makeCreateClientUseCase() {
  const clientRepository = new PrismaClientRepository();
  const userRepository = new PrismaUsersRepository();
  const useCase = new CreateClientUseCase(clientRepository, userRepository);
  return useCase;
}

// src/services/service-client/get.ts
var GetClientUseCase = class {
  constructor(clientRepository) {
    this.clientRepository = clientRepository;
  }
  async execute({
    clientId
  }) {
    const client = await this.clientRepository.findById(clientId);
    if (!client) {
      throw new ResourceNotFoundError();
    }
    return {
      id: client.id,
      legalName: client.legalName,
      tradeName: client.tradeName,
      type: client.type,
      protocol: client.protocol,
      dataFundation: client.dataFundation,
      locationAddress: client.locationAddress,
      correspondenceAddress: client.correspondenceAddress,
      nameContact: client.nameContact,
      numberContact: client.numberContact,
      isActivated: client.isActivated,
      createdAt: client.createdAt,
      updatedAt: client.updatedAt,
      createdById: client.createdById,
      responsibleById: client.responsibleById
    };
  }
};

// src/services/factories/make-get-client-use-case.ts
function makeGetClientProfileUseCase() {
  const clientRepository = new PrismaClientRepository();
  const useCase = new GetClientUseCase(clientRepository);
  return useCase;
}

// src/services/service-client/list.ts
var ListClientUseCase = class {
  constructor(clientRepository) {
    this.clientRepository = clientRepository;
  }
  async execute({
    responsibleById,
    search
  }) {
    const clients = await this.clientRepository.findByIdUserResponsableAndSearch(responsibleById, search);
    return clients;
  }
};

// src/services/factories/make-list-client-use-case.ts
function makeListClientUseCase() {
  const clientRepository = new PrismaClientRepository();
  const useCase = new ListClientUseCase(clientRepository);
  return useCase;
}

// src/utils/formatDocument.ts
function formatDocument(value) {
  const numbers = value.replace(/\D/g, "");
  if (numbers.length <= 11) {
    return numbers.replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  }
  return numbers.replace(/^(\d{2})(\d)/, "$1.$2").replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3").replace(/\.(\d{3})(\d)/, ".$1/$2").replace(/(\d{4})(\d)/, "$1-$2");
}

// src/services/service-client/list-with-options.ts
var ListClientWithOptionsUseCase = class {
  constructor(clientRepository) {
    this.clientRepository = clientRepository;
  }
  async execute({
    responsibleById
  }) {
    const clients = await this.clientRepository.findByIdUserResponsableActivated(responsibleById);
    if (!clients) {
      return [];
    }
    return clients.map((client) => ({
      label: client.tradeName + " - " + formatDocument(client.protocol),
      value: client.id
    }));
  }
};

// src/services/factories/make-list-client-with-options.ts
function makeListClientWithOptionsUseCase() {
  const clientRepository = new PrismaClientRepository();
  const useCase = new ListClientWithOptionsUseCase(clientRepository);
  return useCase;
}

// src/services/service-client/update.ts
var UpdateClientUseCase = class {
  constructor(clientRepository) {
    this.clientRepository = clientRepository;
  }
  async execute({
    id,
    ...data
  }) {
    const client = await this.clientRepository.findById(id);
    if (!client) {
      throw new ResourceNotFoundError();
    }
    const updatedClient = await this.clientRepository.update(id, data);
    return updatedClient;
  }
};

// src/services/factories/make-update-client-use-case.ts
function makeUpdateClientUseCase() {
  const clientRepository = new PrismaClientRepository();
  const GetProfileUseCase = new UpdateClientUseCase(clientRepository);
  return GetProfileUseCase;
}

// src/http/Controllers/client.ts
async function getClient(request, reply) {
  const getClientProfile = makeGetClientProfileUseCase();
  const { id } = request.params;
  try {
    const client = await getClientProfile.execute({
      clientId: id
    });
    return reply.status(200).send(client);
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(409).send({
        message: err.message
      });
    }
  }
}
async function postClient(request, reply) {
  const createClientBodySchema = import_zod4.z.object({
    legalName: import_zod4.z.string().min(1),
    tradeName: import_zod4.z.string().min(1),
    type: import_zod4.z.number().min(1),
    protocol: import_zod4.z.string().min(11).max(15),
    dataFundation: import_zod4.z.coerce.date(),
    locationAddress: import_zod4.z.string().min(1),
    correspondenceAddress: import_zod4.z.string().min(1),
    nameContact: import_zod4.z.string().min(1),
    numberContact: import_zod4.z.string().min(1),
    isActivated: import_zod4.z.boolean()
  });
  const {
    legalName,
    tradeName,
    type,
    protocol,
    dataFundation,
    locationAddress,
    correspondenceAddress,
    nameContact,
    numberContact,
    isActivated
  } = createClientBodySchema.parse(request.body);
  const createClientProfile = makeCreateClientUseCase();
  try {
    await createClientProfile.execute({
      idUser: request.user.sub,
      legalName,
      tradeName,
      type,
      protocol,
      dataFundation,
      locationAddress,
      correspondenceAddress,
      nameContact,
      numberContact,
      isActivated
    });
  } catch (err) {
    if (err instanceof import_zod4.ZodError) {
      return reply.status(400).send({
        message: "Validation error.",
        issues: err.flatten().fieldErrors
      });
    }
    if (err instanceof ResourceAlreadyExistsError) {
      return reply.status(409).send({
        message: err.message
      });
    }
    throw err;
  }
  return reply.status(201).send({ message: "Cliente adicionado com sucesso." });
}
async function listClient(request, reply) {
  const listClient2 = makeListClientUseCase();
  const { id } = request.params;
  const { word: search } = request.query;
  try {
    const clients = await listClient2.execute({
      responsibleById: id,
      search
    });
    return reply.status(200).send(clients);
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(409).send({
        message: err.message
      });
    }
  }
}
async function listClientWithOptions(request, reply) {
  const listClientWithOptions2 = makeListClientWithOptionsUseCase();
  const id = request.user.sub;
  try {
    const clients = await listClientWithOptions2.execute({
      responsibleById: id
    });
    return reply.status(200).send(clients);
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(409).send({
        message: err.message
      });
    }
  }
}
async function updateClient(request, reply) {
  const updateClientBodySchema = import_zod4.z.object({
    legalName: import_zod4.z.string().optional(),
    tradeName: import_zod4.z.string().optional(),
    type: import_zod4.z.number().optional(),
    protocol: import_zod4.z.string().optional(),
    dataFundation: import_zod4.z.coerce.date().optional(),
    locationAddress: import_zod4.z.string().optional(),
    correspondenceAddress: import_zod4.z.string().optional(),
    nameContact: import_zod4.z.string().optional(),
    numberContact: import_zod4.z.string().optional(),
    isActivated: import_zod4.z.boolean().optional(),
    responsibleById: import_zod4.z.string().optional()
  });
  const { id } = request.params;
  const data = updateClientBodySchema.parse(
    request.body
  );
  const updateClientUseCase = makeUpdateClientUseCase();
  const client = await updateClientUseCase.execute({
    id,
    ...data
  });
  return reply.status(200).send(client);
}
async function updateClientStatus(request, reply) {
  const { id } = request.params;
  const bodySchema = import_zod4.z.object({
    isActivated: import_zod4.z.boolean()
  });
  const { isActivated } = bodySchema.parse(
    request.body
  );
  const updateClientStatusUseCase = makeChangeStatusClientUseCase();
  const client = await updateClientStatusUseCase.execute({
    id,
    isActivated
  });
  return reply.status(200).send(client);
}

// src/repositories/prisma/prisma-representative-repository.ts
var PrismaRepresentativeRepository = class {
  constructor() {
    this.representatives = [];
  }
  async findById(id) {
    const representative = prisma.representative.findUnique({
      where: {
        id
      }
    });
    if (!representative) {
      return null;
    }
    return representative;
  }
  async findByIdUserWithSearchRepresentativesOnlyClientsActivated(idUser, search) {
    const representatives = await prisma.representative.findMany({
      where: {
        deletedAt: null,
        client: {
          responsibleById: idUser
        },
        OR: [
          {
            name: {
              contains: search,
              mode: "insensitive"
            }
          },
          {
            nationality: {
              contains: search,
              mode: "insensitive"
            }
          },
          {
            documentRG: {
              contains: search,
              mode: "insensitive"
            }
          },
          {
            documentCPF: {
              contains: search,
              mode: "insensitive"
            }
          },
          {
            titleJob: {
              contains: search,
              mode: "insensitive"
            }
          },
          {
            roleJob: {
              contains: search,
              mode: "insensitive"
            }
          }
        ]
      }
    });
    return representatives;
  }
  async findManyByUserIdWithSearch(userId, search) {
    const representatives = await prisma.representative.findMany({
      where: {
        client: {
          createdById: userId
        },
        OR: [
          {
            name: {
              contains: search,
              mode: "insensitive"
            }
          },
          {
            nationality: {
              contains: search,
              mode: "insensitive"
            }
          },
          {
            documentRG: {
              contains: search,
              mode: "insensitive"
            }
          },
          {
            documentCPF: {
              contains: search,
              mode: "insensitive"
            }
          },
          {
            titleJob: {
              contains: search,
              mode: "insensitive"
            }
          },
          {
            roleJob: {
              contains: search,
              mode: "insensitive"
            }
          }
        ]
      }
    });
    return representatives;
  }
  async findManyRepresentsOnClientsId(id) {
    const representatives = await prisma.representative.findMany({
      where: {
        id,
        deletedAt: null
      },
      select: {
        client: {
          select: {
            id: true,
            legalName: true
          }
        }
      }
    });
    if (!representatives.length) {
      return null;
    }
    return representatives.map((representative) => ({
      label: representative.client.legalName,
      value: representative.client.id
    }));
  }
  async create(data) {
    const representative = await prisma.representative.create({
      data
    });
    return representative;
  }
  async update(data) {
    return prisma.representative.update({
      where: {
        id: data.id
      },
      data
    });
  }
  async delete(id) {
    await prisma.representative.update({
      where: {
        id
      },
      data: {
        deletedAt: new Date(Date.now())
      }
    });
  }
};

// src/services/service-representative/get.ts
var GetRepresentativeUseCase = class {
  constructor(representativeRepository) {
    this.representativeRepository = representativeRepository;
  }
  async execute({
    id
  }) {
    const representatives = await this.representativeRepository.findById(id);
    if (!representatives) {
      throw new ResourceNotFoundError();
    }
    return representatives;
  }
};

// src/services/factories/representatives/make-get-use-case.ts
function makeGetRepresentativeUseCase() {
  const representativeRepository = new PrismaRepresentativeRepository();
  const useCase = new GetRepresentativeUseCase(representativeRepository);
  return useCase;
}

// src/services/service-representative/list.ts
var ListRepresentativeUseCase = class {
  constructor(representativeRepository) {
    this.representativeRepository = representativeRepository;
  }
  async execute({
    idUser,
    search
  }) {
    const representatives = await this.representativeRepository.findByIdUserWithSearchRepresentativesOnlyClientsActivated(
      idUser,
      search
    );
    if (!representatives) {
      throw new ResourceNotFoundError();
    }
    return representatives;
  }
};

// src/services/factories/representatives/make-list-use-case.ts
function makeListRepresentativeUseCase() {
  const representativeRepository = new PrismaRepresentativeRepository();
  const useCase = new ListRepresentativeUseCase(representativeRepository);
  return useCase;
}

// src/services/errors/invalid-inactive-client-error.ts
var InvalidInactiveClientError = class extends Error {
  constructor() {
    super("Cannot proceed with deactivated client");
  }
};

// src/services/service-representative/post.ts
var PostRepresentativeUseCase = class {
  constructor(representativeRepository, clientRepository) {
    this.representativeRepository = representativeRepository;
    this.clientRepository = clientRepository;
  }
  async execute(data) {
    const client = await this.clientRepository.findById(
      data.clientId
    );
    if (!client) {
      throw new ResourceNotFoundError();
    }
    if (!client.isActivated) {
      throw new InvalidInactiveClientError();
    }
    const newRepresentative = {
      clientId: data.clientId,
      name: data.name,
      nationality: data.nationality,
      documentRG: data.documentRG,
      documentCPF: data.documentCPF,
      titleJob: data.titleJob,
      roleJob: data.roleJob,
      createdAt: new Date(Date.now()),
      updatedAt: null,
      deletedAt: null
    };
    const newRegister = await this.representativeRepository.create(newRepresentative);
    return { id: newRegister.id };
  }
};

// src/services/factories/representatives/make-post-use-case.ts
function makePostRepresentativeUseCase() {
  const representativeRepository = new PrismaRepresentativeRepository();
  const clientRepository = new PrismaClientRepository();
  const useCase = new PostRepresentativeUseCase(representativeRepository, clientRepository);
  return useCase;
}

// src/services/service-representative/update.ts
var UpdateRepresentativeUseCase = class {
  constructor(representativeRepository) {
    this.representativeRepository = representativeRepository;
  }
  async execute({
    id,
    clientId,
    ...data
  }) {
    const representatives = await this.representativeRepository.findById(id);
    if (!representatives) {
      throw new ResourceNotFoundError();
    }
    const updatedClient = await this.representativeRepository.update({ id, clientId, ...data });
    return updatedClient;
  }
};

// src/services/factories/representatives/make-update-use-case.ts
function makeUpdateRepresentativeUseCase() {
  const representativeRepository = new PrismaRepresentativeRepository();
  const useCase = new UpdateRepresentativeUseCase(representativeRepository);
  return useCase;
}

// src/services/service-representative/delete.ts
var DeleteRepresentativeUseCase = class {
  constructor(representativeRepository) {
    this.representativeRepository = representativeRepository;
  }
  async execute({
    id
  }) {
    const representatives = await this.representativeRepository.findById(id);
    if (!representatives) {
      throw new ResourceNotFoundError();
    }
    await this.representativeRepository.delete(id);
  }
};

// src/services/factories/representatives/make-delete-use-case.ts
function makeDeleteRepresentativeUseCase() {
  const representativeRepository = new PrismaRepresentativeRepository();
  const useCase = new DeleteRepresentativeUseCase(representativeRepository);
  return useCase;
}

// src/http/Controllers/representative.ts
var import_zod5 = require("zod");

// src/services/service-representative/get-of-clients.ts
var GetRepresentativeOfClientsUseCase = class {
  constructor(representativeRepository) {
    this.representativeRepository = representativeRepository;
  }
  async execute({
    id
  }) {
    const representatives = await this.representativeRepository.findManyRepresentsOnClientsId(id);
    if (!representatives) {
      throw new ResourceNotFoundError();
    }
    return representatives;
  }
};

// src/services/factories/representatives/make-get-of-clients-use-case.ts
function makeGetRepresentativeOfClientsUseCase() {
  const representativeRepository = new PrismaRepresentativeRepository();
  const useCase = new GetRepresentativeOfClientsUseCase(representativeRepository);
  return useCase;
}

// src/http/Controllers/representative.ts
async function listRepresentative(request, reply) {
  const listRepresentativeUseCase = makeListRepresentativeUseCase();
  const id = request.user.sub;
  const { search } = request.query;
  try {
    const representatives = await listRepresentativeUseCase.execute({
      idUser: id,
      search
    });
    return reply.status(200).send(representatives);
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(409).send({
        message: err.message
      });
    }
  }
}
async function postRepresentative(request, reply) {
  const createRepresentativeBodySchema = import_zod5.z.object({
    name: import_zod5.z.string().min(1),
    nationality: import_zod5.z.string().min(1),
    documentRG: import_zod5.z.string().min(8).max(9),
    documentCPF: import_zod5.z.string().min(11).max(12),
    titleJob: import_zod5.z.string().min(1),
    roleJob: import_zod5.z.string().min(1),
    clientId: import_zod5.z.string().min(1)
  });
  const {
    name,
    nationality,
    documentRG,
    documentCPF,
    titleJob,
    roleJob,
    clientId
  } = createRepresentativeBodySchema.parse(request.body);
  const postRepresentativeUseCase = makePostRepresentativeUseCase();
  try {
    await postRepresentativeUseCase.execute({
      clientId,
      name,
      nationality,
      documentRG,
      documentCPF,
      titleJob,
      roleJob
    });
  } catch (err) {
    if (err instanceof import_zod5.ZodError) {
      return reply.status(400).send({
        message: "Validation error.",
        issues: err.flatten().fieldErrors
      });
    }
    throw err;
  }
}
async function getRepresentative(request, reply) {
  const getRepresentative2 = makeGetRepresentativeUseCase();
  const { id } = request.params;
  const representative = await getRepresentative2.execute({
    id
  });
  return reply.status(200).send(representative);
}
async function getRepresentativeOfClients(request, reply) {
  const getRepresentativeOfClients2 = makeGetRepresentativeOfClientsUseCase();
  const { id } = request.params;
  const representative = await getRepresentativeOfClients2.execute({
    id
  });
  return reply.status(200).send(representative);
}
async function updateRepresentative(request, reply) {
  const updateRepresentativeBodySchema = import_zod5.z.object({
    name: import_zod5.z.string().min(1).optional(),
    nationality: import_zod5.z.string().min(1).optional(),
    documentRG: import_zod5.z.string().min(8).max(9).optional(),
    documentCPF: import_zod5.z.string().min(11).max(12).optional(),
    titleJob: import_zod5.z.string().min(1).optional(),
    roleJob: import_zod5.z.string().min(1).optional(),
    clientId: import_zod5.z.string().min(1)
  });
  const { id } = request.params;
  const data = updateRepresentativeBodySchema.parse(
    request.body
  );
  const updateRepresentativeUseCase = makeUpdateRepresentativeUseCase();
  const representative = await updateRepresentativeUseCase.execute({
    id,
    ...data
  });
  return reply.status(200).send(representative);
}
async function deleteRepresentative(request, reply) {
  const paramsDeleteSchema = import_zod5.z.object({
    id: import_zod5.z.string().uuid()
  });
  const { id } = paramsDeleteSchema.parse(request.params);
  const deleteClientUseCase = makeDeleteRepresentativeUseCase();
  await deleteClientUseCase.execute({ id });
  return reply.status(204).send();
}

// src/http/routes.ts
async function appRoutes(app) {
  app.post("/users", register);
  app.post("/session", authenticate);
  app.get("/me", { onRequest: [verifyJWT] }, profile);
  app.get("/client/:id", { onRequest: [verifyJWT] }, getClient);
  app.get("/client/user/:id", { onRequest: [verifyJWT] }, listClient);
  app.get("/clients/options", { onRequest: [verifyJWT] }, listClientWithOptions);
  app.post("/client", { onRequest: [verifyJWT] }, postClient);
  app.patch("/client/:id", { onRequest: [verifyJWT] }, updateClient);
  app.patch("/client/:id/status", { onRequest: [verifyJWT] }, updateClientStatus);
  app.get("/representatives", { onRequest: [verifyJWT] }, listRepresentative);
  app.get("/representative/:id", { onRequest: [verifyJWT] }, getRepresentative);
  app.get("/representative/:id/clients", { onRequest: [verifyJWT] }, getRepresentativeOfClients);
  app.post("/representative", { onRequest: [verifyJWT] }, postRepresentative);
  app.patch("/representative/:id", { onRequest: [verifyJWT] }, updateRepresentative);
  app.delete("/representative/:id", { onRequest: [verifyJWT] }, deleteRepresentative);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  appRoutes
});
