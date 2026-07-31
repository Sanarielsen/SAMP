import * as cheerio from "cheerio";
import { 
  buildProcessBody, 
  getDates, 
  getSpecification, 
  getValueByLabel 
} from "@/utils/parseAnswerCheerio";

import { ImportedProcessDetailFromINPI } from "@shared/types/processImported";


export function parseDetail(
  html: string
): ImportedProcessDetailFromINPI {

  const $ = cheerio.load(html);

  const dates = getDates($);

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
    sourceEntireProcess: ""
  }

  return {
    ...process,
    sourceEntireProcess: buildProcessBody(process),
  };
}