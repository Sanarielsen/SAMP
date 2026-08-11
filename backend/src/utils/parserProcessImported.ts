import * as cheerio from "cheerio";
import { 
  buildProcessBody, 
  getDates, 
  getNiceClass,
  getNiceClassSituation,
  getSpecification, 
  getValueByLabel,
  getMagazineInformation,
} from "@/utils/parseAnswerCheerio";

import { ImportedProcessFromINPI } from "@shared/types/importedProcess";

export function parseDetail(
  html: string
): ImportedProcessFromINPI {

  const $ = cheerio.load(html);

  const dates = getDates($);
  const magazine = getMagazineInformation($);

  const processNumber = getValueByLabel($, "Nº do Processo") ?? "";
  const processStatus = getValueByLabel($, "Situação") ?? "";
  const brand = getValueByLabel($, "Marca") ?? "";
  const holder = getValueByLabel($, "Titular") ?? "";
  const presentation = getValueByLabel($, "Apresentação") ?? "";
  const nature = getValueByLabel($, "Natureza") ?? "";
  const niceTitle = getNiceClass($) ?? "";
  const niceStatus = getNiceClassSituation($) ?? "";
  const niceSpecification = getSpecification($) ?? "";
  const filingDate = dates.filingDate ?? "";
  const grantDate = dates.grantDate ?? "";
  const expirationDate = dates.expirationDate ?? "";

  console.log(getValueByLabel($, "Situação"))

  const process = {
    processNumber,
    processStatus,
    processMagazine: magazine.magazineNumber ?? "",
    brand,
    holder,
    presentation,
    nature,
    niceTitle,
    niceStatus,
    niceSpecification,
    filingDate,
    grantDate,
    expirationDate,
    updatedAtByMagazine: magazine.updatedAtByMagazine ?? undefined,
  }

  const { processStatus: status, ...result } = process;

  return {  
    ...result,
    processStatus: process.processStatus,
    sourceEntireProcess: buildProcessBody(process),
  };
}