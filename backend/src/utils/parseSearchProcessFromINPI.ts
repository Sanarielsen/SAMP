import * as cheerio from "cheerio";

import { cleanText } from "@/utils/parseAnswerCheerio";

import { ImportedProcessFromINPI } from "@shared/types/importedProcess";


export function parseSearchProcessFromINPI(
  html: string
): ImportedProcessFromINPI | null {
  const $ = cheerio.load(html);

  // Find the first process link
  const link = $("a[href*='Action=detail']").first();

  if (!link.length) {
    return null;
  }

  const href = link.attr("href") ?? "";
  const codPedido = href.match(/CodPedido=(\d+)/)?.[1] ?? "";

  const row = link.closest("tr");

  const cells = row.find("td");

  return {
    codPedido,
    processNumber: $(cells[0]).text().trim(),
    brand: $(cells[3]).text().trim(),
    status: $(cells[5]).text().trim(),
    holder: $(cells[6]).text().trim(),
    class: $(cells[7]).text().trim(),
    sourceBody: cleanText($(cells).text().trim()),
  };
}