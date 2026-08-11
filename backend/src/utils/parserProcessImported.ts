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

import { ImportedProcessDetailFromINPI } from "@shared/types/importedProcess";

export function parseDetail(
  html: string
): ImportedProcessDetailFromINPI {

  const $ = cheerio.load(html);

  const dates = getDates($);
  const magazine = getMagazineInformation($);

  const processNumber = getValueByLabel($, "Nº do Processo") ?? "";
  const processStatus = getValueByLabel($, "Situação") ?? "";
  const brand = getValueByLabel($, "Marca") ?? "";
  const holder = getValueByLabel($, "Titular") ?? "";
  const presentation = getValueByLabel($, "Apresentação") ?? "";
  const nature = getValueByLabel($, "Natureza") ?? "";
  const niceClass = getNiceClass($) ?? "";
  const niceClassSituation = getNiceClassSituation($) ?? "";
  const specification = getSpecification($) ?? "";
  const filingDate = dates.filingDate ?? "";
  const grantDate = dates.grantDate ?? "";
  const expirationDate = dates.expirationDate ?? "";

  const process = {
    processNumber,
    processStatus,
    processMagazine: magazine.magazineNumber ?? "",
    brand,
    holder,
    presentation,
    nature,
    niceClass,
    niceClassSituation,
    specification,
    filingDate,
    grantDate,
    expirationDate,
    updatedAtByMagazine: magazine.updatedAtByMagazine ?? undefined,
  }

  const { processStatus: status, ...result } = process;

  return {
    ...result,
    status,
    sourceEntireProcess: buildProcessBody(process),
  };
}