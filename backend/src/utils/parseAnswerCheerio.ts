import * as cheerio from "cheerio";

import { ImportedProcessDetailFromINPI } from "@shared/types/processImported";


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
    depositDate: dates[0] ?? null,
    grantDate: dates[1] ?? null,
    expirationDate: dates[2] ?? null,
  };
}

export function getSpecification($: cheerio.CheerioAPI): string | null {
  const table = $("table").filter((_, table) => {
    return $(table).text().includes("Classe de Nice");
  }).first();

  if (!table.length) {
    return null;
  }

  const row = table.find("tbody > tr").first();

  if (!row.length) {
    return null;
  }

  const specification = row
    .children("td")
    .eq(2)
    .find("div[id^='especificacao']")
    .find("font.normal")
    .last()
    .text()
    .replace(/\u00a0/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  return specification || null;
}

export function buildProcessBody(
  process: ImportedProcessDetailFromINPI
): string {
  return [
    `Process Number: ${process.processNumber}`,
    `Status: ${process.status}`,
    `Brand: ${process.brand}`,
    `Holder: ${process.holder}`,
    `Presentation: ${process.presentation}`,
    `Nature: ${process.nature}`,
    `Specification: ${process.specification}`,
    `Deposit Date: ${process.depositDate}`,
    `Grant Date: ${process.grantDate}`,
    `Expiration Date: ${process.expirationDate}`,
  ]
    .filter(line => !line.endsWith(": null") && !line.endsWith(": undefined"))
    .join("\n");
}