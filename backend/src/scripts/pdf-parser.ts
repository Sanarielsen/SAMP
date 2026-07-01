import { readFile } from "node:fs/promises";
import path from "node:path";
import { PDFParse } from "pdf-parse";

async function main() {
  const filePath = path.resolve(process.cwd(), "src/storage/INPI/Marcas2895.pdf");
  const file = await readFile(filePath);

  const parser = new PDFParse({ data: new Uint8Array(file) });
  const result = await parser.getText();
  await parser.destroy();

  console.log(result.text);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
