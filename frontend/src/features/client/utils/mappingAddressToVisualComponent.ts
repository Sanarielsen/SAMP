import type { AddressSchemaFormData } from "@/features/client/schema/updateClientSchema";

export function mappingAddressToVisualComponent(
  address: AddressSchemaFormData
) {

  return {
    street: address.street,
    number: address.number,
    complement: address.complement,
    district: address.district,
    city: address.city,
    state: address.state,
    country: address.country,
    cep: address.cep
  };
}

