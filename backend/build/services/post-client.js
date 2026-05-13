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

// src/services/post-client.ts
var post_client_exports = {};
__export(post_client_exports, {
  CreateClientUseCase: () => CreateClientUseCase
});
module.exports = __toCommonJS(post_client_exports);

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

// src/services/post-client.ts
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CreateClientUseCase
});
