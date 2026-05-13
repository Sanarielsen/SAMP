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

// src/services/change-status-client.ts
var change_status_client_exports = {};
__export(change_status_client_exports, {
  UpdateClientStatusUseCase: () => UpdateClientStatusUseCase
});
module.exports = __toCommonJS(change_status_client_exports);

// src/services/errors/resource-not-found-error.ts
var ResourceNotFoundError = class extends Error {
  constructor() {
    super("Resource not found.");
  }
};

// src/services/change-status-client.ts
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  UpdateClientStatusUseCase
});
