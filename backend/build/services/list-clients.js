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

// src/services/list-clients.ts
var list_clients_exports = {};
__export(list_clients_exports, {
  ListClientUseCase: () => ListClientUseCase
});
module.exports = __toCommonJS(list_clients_exports);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ListClientUseCase
});
