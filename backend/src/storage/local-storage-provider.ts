import { 
  mkdir, 
  writeFile, 
  readFile, 
  unlink
} from "node:fs/promises";
import path from "node:path";

import { StorageProvider } from "@/storage/storage-provider";


export class LocalStorageProvider implements StorageProvider {

  async upload(file: Buffer, fileName: string, folder: string): Promise<string> {

    const folderComplete = path.resolve(
      process.cwd(),
      folder,
    );

    console.log("Caminho: ", folderComplete)

    await mkdir(folderComplete, { recursive: true });

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