import * as cheerio from "cheerio";
import { 
  buildProcessBody, 
  getDates, 
  getSpecification, 
  getValueByLabel,
  getMagazineInformation,
} from "@/utils/parseAnswerCheerio";

import { ImportedProcessDetailFromINPI } from "@shared/types/importedProcess";

export function parseDetail(
  html: string
): ImportedProcessDetailFromINPI {

  const $ = cheerio.load(html);

  const dates = getDates($);
  const magazine = getMagazineInformation($);

  const process = {
    processNumber: getValueByLabel($, "Nº do Processo"),
    status: getValueByLabel($, "Situação"),
    brand: getValueByLabel($, "Marca"),
    holder: getValueByLabel($, "Titular"),
    presentation: getValueByLabel($, "Apresentação"),
    nature: getValueByLabel($, "Natureza"),
    specification: getSpecification($),
    depositDate: dates.depositDate,
    grantDate: dates.grantDate,
    expirationDate: dates.expirationDate,
    magazineNumber: magazine.magazineNumber,
    updatedAtByMagazine: magazine.updatedAtByMagazine,
    sourceEntireProcess: ""
  }

  return {
    ...process,
    sourceEntireProcess: buildProcessBody(process),
  };
}