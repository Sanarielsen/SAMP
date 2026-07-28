import * as cheerio from "cheerio";

import { cleanText } from "@/utils/parseAnswerCheerio";

import { ImportedProcessFromINPI } from "@shared/types/importedProcess";


export function parseSearchProcessFromINPI(
  html: string
): ImportedProcessFromINPI | null {
  const $ = cheerio.load(html);

  const link = $("a[href*='Action=detail']").first();

  if (!link.length) {
    return null;
  }

  const href = link.attr("href") ?? "";
  const pedidoNumber = href.match(/CodPedido=(\d+)/)?.[1] ?? "";

  const row = link.closest("tr");

  const cells = row.find("td");

  return {
    pedidoNumber,
    processNumber: $(cells[0]).text().trim(),
    processStatus: $(cells[5]).text().trim(),
    brand: $(cells[3]).text().trim(),
    holder: $(cells[6]).text().trim(),
    nature: $(cells[7]).text().trim(),
    sourceEntireProcess: cleanText($(cells).text().trim()),
  };
}