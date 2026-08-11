import * as cheerio from "cheerio";

import { ImportedProcessDetailFromINPI, ImportedProcessFromINPI } from "@shared/types/importedProcess";


export function cleanText(value: string): string {
  return value
    .replace(/\s+/g, " ")
    .trim();
}

function normalize(text: string): string {
  return text
    .replace(/\u00a0/g, " ")
    .replace(/\s+/g, " ")
    .replace(/：/g, ":")
    .trim()
    .toLowerCase();
}

export function getValueByLabel(
  $: cheerio.CheerioAPI,
  label: string,
): string | null {

  const expected = normalize(label);

  const td = $("td").filter((_, element) => {
    const text = normalize($(element).text());

    // Remove ":" do final
    const clean = text.replace(/:$/, "");

    // Marca:
    if (clean === expected) {
      return true;
    }

    // Titular(1), Titular(2)...
    if (clean.startsWith(`${expected}(`)) {
      return true;
    }

    return false;
  }).filter((_, element) => {
    // O label deve possuir uma próxima coluna
    return $(element).next("td").length > 0;
  }).first();

  if (!td.length) {
    return null;
  }

  const value = td
    .next("td")
    .text()
    .replace(/\u00a0/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  return value || null;
}

//v1
// export function getMagazineInformation($: cheerio.CheerioAPI) {
//   const fullText = $("body").text().replace(/\s+/g, " ").trim();
//   const match = fullText.match(/dados atualizados até\s*[:]?\s*([0-3]?\d\/[0-1]?\d\/[0-9]{4})\s*[-–—]\s*n\.?º?\s*da revista\s*[:]?\s*([0-9]+)/i);

//   if (!match) {
//     return {
//       magazineNumber: null,
//       updatedAtByMagazine: null,
//     };
//   }

//   const [, dateValue, magazineNumber] = match;
//   const updatedAtByMagazine = parseDateDDMMYYYY(dateValue);

//   return {
//     magazineNumber,
//     updatedAtByMagazine,
//   };
// }

export function getMagazineInformation($: cheerio.CheerioAPI) {
  const fullText = $("body").text().replace(/\s+/g, " ").trim();

  const match = fullText.match(
    /Dados atualizados até\s+(\d{2}\/\d{2}\/\d{4})\s*-\s*N[º°]?\s*da\s*Revista:\s*(\d+)/i,
  );

  if (!match) {
    return {
      magazineNumber: null,
      updatedAtByMagazine: null,
    };
  }

  return {
    updatedAtByMagazine: parseDateDDMMYYYY(match[1]),
    magazineNumber: match[2],
  };
}

function parseDateDDMMYYYY(date: string): Date | null {
  const [day, month, year] = date.split("/").map(Number);

  if (!day || !month || !year) {
    return null;
  }

  const parsedDate = new Date(year, month - 1, day);

  if (Number.isNaN(parsedDate.getTime())) {
    return null;
  }

  return parsedDate;
}

function getNiceClassRow($: cheerio.CheerioAPI) {
  const table = $("table")
    .filter((_, table) => $(table).text().includes("Classe de Nice"))
    .first();

  if (!table.length) {
    return null;
  }

  const row = table
    .find("tr")
    .filter((_, tr) => $(tr).find("td").length >= 2)
    .first();

  return row.length ? row : null;
}

export function getNiceClass($: cheerio.CheerioAPI): string | null {
  const row = getNiceClassRow($);

  if (!row) {
    return null;
  }

  let text = cleanText(row.children("td").eq(0).text());

  // Remove o trecho de revisão quando ele estiver no mesmo campo
  text = text.split(/Classe Nice\s*-\s*Revisão:/i)[0].trim();

  const match = text.match(/Classe de Nice\s*[:\-]?\s*(.+)$/i);

  if (match) {
    return match[1].trim();
  }

  return text;
}

export function getNiceClassSituation($: cheerio.CheerioAPI): string | null {
  const row = getNiceClassRow($);

  if (!row) {
    return null;
  }

  return cleanText(row.children("td").eq(1).text());
}

export function getDates($: cheerio.CheerioAPI) {
  const dates = $("tr[bgcolor='#e9e9e9'] th")
    .map((_, el) =>
      $(el)
        .text()
        .replace(/\s+/g, " ")
        .trim()
    )
    .get()
    .filter(Boolean);

  return {
    filingDate: dates[0] ?? null,
    grantDate: dates[1] ?? null,
    expirationDate: dates[2] ?? null,
  };
}

export function getSpecification($: cheerio.CheerioAPI): string | null {
  const row = getNiceClassRow($);

  if (!row) {
    return null;
  }

  const specificationCell = row.children("td").eq(2);

  const specificationText = specificationCell
    .find("div[id^='especificacao']")
    .find("font.normal")
    .last()
    .text();

  const cleanedSpecification = cleanText(specificationText);
  const fallbackSpecification = cleanText(specificationCell.text());

  return cleanedSpecification || fallbackSpecification || null;
}

export function buildProcessBody(
  process: {
    processNumber: string | null;
    processStatus: string | null;
    processMagazine: string | null;
    brand: string | null;
    holder: string | null;
    presentation: string | null;
    nature: string | null;
    niceClass?: string | null;
    niceClassSituation?: string | null;
    specification: string | null;
    filingDate: string | null;
    grantDate: string | null;
    expirationDate: string | null;
    updatedAtByMagazine: Date | null | undefined;
  }
): string {
  const updatedAtByMagazineLine = process.updatedAtByMagazine
    ? `Atualizado pela revista em: ${process.updatedAtByMagazine.toLocaleDateString("pt-BR")}`
    : null;

  return [
    process.processMagazine && `Número da revista: ${process.processMagazine}`,
    `Número do processo: ${process.processNumber}`,
    `Status: ${process.processStatus}`,
    `Marca: ${process.brand}`,
    `Titular: ${process.holder}`,
    `Apresentacao: ${process.presentation}`,
    `Natureza: ${process.nature}`,
    `Classe de Nice: ${process.niceClass}`,
    `Situação da Classe: ${process.niceClassSituation}`,
    `Especificacao: ${process.specification}`,
    `Data de depósito: ${process.filingDate}`,
    `Data de concessão: ${process.grantDate}`,
    `Data de vigência: ${process.expirationDate}`,
    updatedAtByMagazineLine,
  ]
    .filter((line): line is string => typeof line === "string" && !line.endsWith(": null") && !line.endsWith(": undefined"))
    .join("\n");
}