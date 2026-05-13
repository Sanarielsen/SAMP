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

// src/repositories/in-memory/in-memory-client-repository.ts
var in_memory_client_repository_exports = {};
__export(in_memory_client_repository_exports, {
  InMemoryClientsRepository: () => InMemoryClientsRepository
});
module.exports = __toCommonJS(in_memory_client_repository_exports);
var InMemoryClientsRepository = class {
  constructor() {
    this.items = [];
  }
  async findByIdUserResponsableAndSearch(idUser, search) {
    const clients = this.items.filter(
      (item) => item.responsibleById === idUser && item.legalName.includes(search)
    );
    return clients;
  }
  async findByIdUserResponsable(idUser) {
    return this.items.filter((client) => {
      return client.responsibleById === idUser;
    });
  }
  async findById(id) {
    const Client = this.items.find((item) => item.id == id);
    if (!Client) {
      return null;
    }
    return Client;
  }
  async findByProtocol(protocol) {
    const Client = this.items.find((item) => item.protocol == protocol);
    if (!Client) {
      return null;
    }
    return Client;
  }
  async create(data) {
    const client = {
      ...data,
      id: "client-1",
      updatedAt: new Date(Date.now())
    };
    this.items.push(client);
    return client;
  }
  async update(id, data) {
    const client = this.items.findIndex((client2) => {
      return client2.id === id;
    });
    const updatedClient = {
      ...this.items[client],
      ...data,
      updatedAt: /* @__PURE__ */ new Date()
    };
    this.items[client] = updatedClient;
    return updatedClient;
  }
  async updateStatus(id, data) {
    const clientIndex = this.items.findIndex((client) => {
      return client.id === id;
    });
    this.items[clientIndex].isActivated = false;
    this.items[clientIndex].updatedAt = /* @__PURE__ */ new Date();
    return this.items[clientIndex];
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  InMemoryClientsRepository
});
