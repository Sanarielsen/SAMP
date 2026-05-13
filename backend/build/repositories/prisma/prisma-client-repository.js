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

// src/repositories/prisma/prisma-client-repository.ts
var prisma_client_repository_exports = {};
__export(prisma_client_repository_exports, {
  PrismaClientRepository: () => PrismaClientRepository
});
module.exports = __toCommonJS(prisma_client_repository_exports);

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

// src/repositories/prisma/prisma-client-repository.ts
var PrismaClientRepository = class {
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  PrismaClientRepository
});
