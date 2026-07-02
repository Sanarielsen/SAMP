import { 
  mkdir, 
  writeFile, 
  readFile, 
  unlink
} from "node:fs/promises";
import path from "node:path";

import { StorageProvider } from "@/storage/storage-provider";


export class LocalStorageProvider implements StorageProvider {

  async upload(file: Buffer, fileName: string): Promise<string> {

    const folder = path.resolve(
      process.cwd(),
      "src/storage/process",
    );

    await mkdir(folder, { recursive: true });

    const filePath = path.join(folder, fileName);

    await writeFile(filePath, file);

    return filePath;
  }

  async download(filePath: string): Promise<Buffer> {
    return readFile(filePath);
  }

  async delete(filePath: string): Promise<void> {
    await unlink(filePath);
  }
}