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
    processStatus: getValueByLabel($, "Situação"),
    processMagazine: magazine.magazineNumber,
    brand: getValueByLabel($, "Marca"),
    holder: getValueByLabel($, "Titular"),
    presentation: getValueByLabel($, "Apresentação"),
    nature: getValueByLabel($, "Natureza"),
    specification: getSpecification($),
    filingDate: dates.filingDate,
    grantDate: dates.grantDate,
    expirationDate: dates.expirationDate,
    updatedAtByMagazine: magazine.updatedAtByMagazine,
    sourceEntireProcess: ""
  }

  return {
    ...process,
    sourceEntireProcess: buildProcessBody(process),
  };
}