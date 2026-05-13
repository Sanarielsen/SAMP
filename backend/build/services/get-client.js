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

// src/services/get-client.ts
var get_client_exports = {};
__export(get_client_exports, {
  GetClientUseCase: () => GetClientUseCase
});
module.exports = __toCommonJS(get_client_exports);

// src/services/errors/resource-not-found-error.ts
var ResourceNotFoundError = class extends Error {
  constructor() {
    super("Resource not found.");
  }
};

// src/services/get-client.ts
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  GetClientUseCase
});
