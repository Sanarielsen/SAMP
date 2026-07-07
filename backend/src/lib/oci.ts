import * as common from "oci-common";
import * as objectstorage from "oci-objectstorage";

import { getRequiredEnv } from "@/utils/getRequiredEnv";


const provider = new common.SimpleAuthenticationDetailsProvider(
  getRequiredEnv("OCI_TENANCY"),
  getRequiredEnv("OCI_USER"),
  getRequiredEnv("OCI_FINGERPRINT"),
  getRequiredEnv("OCI_PRIVATE_KEY"),
  null,
  common.Region.SA_SAOPAULO_1
);

export const oci_client = new objectstorage.ObjectStorageClient({
    authenticationDetailsProvider: provider,
});