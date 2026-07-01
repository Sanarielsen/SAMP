export interface StorageProvider {
  upload(file: Buffer, fileName: string, folder: string): Promise<string>;
  download(path: string): Promise<Buffer>;
  delete(path: string): Promise<void>;
}