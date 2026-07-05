import { ImportDataError } from "@/services/errors/import-data-error";

export function checkMagazineWillBeUploaded(text: string, numberMagazine: string) {

  const header = text.slice(0, 100_000);

  const match = header.match(/RPI\s+(\d+)/);

  if (!match) {
    throw new ImportDataError();
  }

  const detectedNumber = match[1];

  if (detectedNumber !== numberMagazine) {
    throw new ImportDataError();
  }
}