import { 
  mkdir, 
  writeFile, 
  readFile, 
  unlink
} from "node:fs/promises";
import path from "node:path";

import { StorageProvider } from "@/storage/storage-provider";
import { oci_client } from "@/lib/oci";
import { getRequiredEnv } from "@/utils/getRequiredEnv";


export class LocalStorageProvider implements StorageProvider {

  async upload(file: Buffer, fileName: string, folder: string): Promise<string> {

    const objectName = `${folder}/${fileName}`;

    const buffer = Buffer.from(file);

    await oci_client.putObject({
      namespaceName: getRequiredEnv('OCI_BUCKET_NAMESPACE'),
      bucketName: getRequiredEnv('OCI_BUCKET'),
      objectName,
      putObjectBody: buffer,
    });

    return objectName;
  }

  async download(filePath: string): Promise<Buffer> {
    const response = await oci_client.getObject({
      namespaceName: getRequiredEnv('OCI_BUCKET_NAMESPACE'),
      bucketName: getRequiredEnv('OCI_BUCKET'),
      objectName: filePath,
    });

    const chunks: Buffer[] = [];

    for await (const chunk of response.value) {
      chunks.push(Buffer.from(chunk));
    }

    return Buffer.concat(chunks);
  }

  async delete(filePath: string): Promise<void> {
    await unlink(filePath);
  }
}