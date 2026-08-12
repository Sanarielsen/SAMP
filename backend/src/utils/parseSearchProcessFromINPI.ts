import * as cheerio from "cheerio";

import { cleanText } from "@/utils/parseAnswerCheerio";

import {
  ImportedProcessFromINPI,
} from "@shared/types/importedProcess";
import { ProcessPublicationFromINPI } from "@shared/types/processPublication";


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
  } as any;
}

export function parsePublicationsFromINPI(
  html: string
): ProcessPublicationFromINPI[] {
  const $ = cheerio.load(html);

  // Find a table whose header contains the expected columns
  let pubTable: any = null;

  $("table").each((i: number, table: any) => {
    const headers = $(table)
      .find("th")
      .map((_, th) => $(th).text().trim())
      .get();

    const headerText = headers.join("|");
    if (
      headerText.includes("RPI") &&
      headerText.includes("Data RPI") &&
      headerText.includes("Despacho")
    ) {
      pubTable = $(table);
      return false;
    }
    return undefined;
  });

  if (!pubTable) {
    return [];
  }

  const rows: any =
    pubTable.find("tbody tr").length > 0
      ? pubTable.find("tbody tr")
      : pubTable.find("tr").slice(1);

  const publications: ProcessPublicationFromINPI[] = [];

  rows.each((i: number, tr: any) => {
    const $tr = $(tr);
    const cells = $tr.find("td");
    if (!cells.length) return;

    const rpi = $(cells[0]).text().trim();
    const dataRPI = $(cells[1]).text().trim();
    const despacho = $(cells[2]).text().trim();
    const certificado = $(cells[3]).text().trim();
    const inteiroTeor = $(cells[4]).text().trim();
    const complementoDespacho = cleanText($(cells[5]).text().trim());

    publications.push({
      magazineNumber: rpi,
      publicationDate: dataRPI,
      dispatch: despacho,
      certificate: certificado,
      description: inteiroTeor,
      complement: complementoDespacho,
      entireSource: $tr.text().trim(),
    });
  });

  return publications;
}