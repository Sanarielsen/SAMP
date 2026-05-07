import type { AddressSchemaFormData } from "../schema/updateClientSchema";

export function formatAddress(
  address?: AddressSchemaFormData
) {

  if (!address) {
    return "";
  }

  const cityState =
    address.city && address.state
      ? `${address.city} - ${address.state}`
      : "";

  return [
    address.street,
    address.number,
    address.district,
    cityState,
    address.country,
    address.cep,
    address.complement,
  ]
    .filter(Boolean)
    .join(", ");
}