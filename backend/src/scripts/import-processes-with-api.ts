import { readFileSync } from "node:fs";
import { PrismaClient } from "@prisma/client";
import { addYears } from "@/utils/addYears";
import { PROCESS_BRAND_TYPES } from "@/utils/mockProcessTypeBrands";
import { ImportDataError } from "@/services/errors/import-data-error";

const prisma = new PrismaClient();

async function main() {
  const filePath = process.argv[2];

  await importProcessesWithAPI(filePath, process.argv[3]);
}

if (require.main === module) {
  main()
    .catch(console.error)
    .finally(async () => {
      await prisma.$disconnect();
  });
}

export async function importProcessesWithAPI(filePath: string, numberMagazine: string) {
  const text = readFileSync(filePath, "utf-8");
  const processes = splitProcesses(text);

  for (const raw of processes) {
    const parsed = parseProcessEntry(raw);
    console.log("Cadastra esse processo: ", parsed.processNumber)
    if (!parsed.processNumber) {
      continue;
    }

    const processType = await ensureProcessType(parsed.processTypeName);

    //Add the extrated process on the entity
    await prisma.process.create({
      data: {
        processTypeId: processType.id,
        processNumber: parsed.processNumber,
        title: parsed.title,
        titular: parsed.titular ?? undefined,
        dispatchDescription: parsed.dispatchDescription ?? undefined,
        publishDate: parsed.publishDate ?? undefined,
        dueDate: parsed.dueDate ?? undefined,
        grantingDate: parsed.grantingDate ?? undefined,
        depositDate: parsed.depositDate ?? undefined,
        receiptDate: parsed.receiptDate ?? undefined,
        internationalRegistration: parsed.internationalRegistration ?? undefined,
        presentation: parsed.presentation ?? undefined,
        nature: parsed.nature ?? undefined,
        nominativeElement: parsed.nominativeElement ?? undefined,
        ncl: parsed.ncl ?? undefined,
        specification: parsed.specification ?? undefined,
        sourceText: parsed.sourceText,
        status: "imported",
      },
    });
  }
}

function normalizeSlug(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function parseBrazilianDate(value: string | null | undefined) {
  if (!value) return null;

  const match = value.trim().match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
  if (!match) return null;

  const [, day, month, year] = match;
  return new Date(`${year}-${month}-${day}`);
}

function isProcessStart(line: string, nextLines: string[] = []) {
  const trimmed = line.trim();
  if (!trimmed) return false;

  const directMatch = trimmed.match(/^(\d{6,})(?:\s*)(.+)$/);
  if (directMatch) {
    const title = directMatch[2].trim();
    return PROCESS_BRAND_TYPES.some(({ regex }) => regex.test(title));
  }

  if (/^\d{6,}$/.test(trimmed)) {
    const titleLine = nextLines
      .map((item) => item.trim())
      .find((item) => {
        if (!item) return false;
        if (/^\d{2}\/\d{2}\/\d{4}$/.test(item)) return false;
        return PROCESS_BRAND_TYPES.some(({ regex }) => regex.test(item));
      });

    return Boolean(titleLine);
  }

  if (/^\d{2}\/\d{2}\/\d{4}\b/.test(trimmed)) {
    return /petição|segunda via|certificado|registro/i.test(trimmed);
  }

  return false;
}

function getTitleFromLine(line: string, nextLines: string[] = []) {
  const trimmed = line.trim();

  const directMatch = trimmed.match(/^(\d{6,})(?:\s*)(.+)$/);
  if (directMatch) {
    const rawTitle = directMatch[2].trim();
    if (rawTitle) {
      return PROCESS_BRAND_TYPES.find(({ regex }) => regex.test(rawTitle))?.title ?? rawTitle;
    }
  }

  if (/^\d{6,}$/.test(trimmed)) {
    const titleLine = nextLines
      .map((item) => item.trim())
      .find((item) => {
        if (!item || /^\d{2}\/\d{2}\/\d{4}$/.test(item)) return false;
        return PROCESS_BRAND_TYPES.some(({ regex }) => regex.test(item));
      });

    if (titleLine) {
      return PROCESS_BRAND_TYPES.find(({ regex }) => regex.test(titleLine))?.title ?? titleLine;
    }
  }

  return null;
}

function readLabelValue(lines: string[], label: string) {
  const normalizedLabel = label.trim().replace(/:$/, "");

  const pattern = new RegExp(
    `^${normalizedLabel.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\s*:\\s*`,
    "i"
  );

  for (const item of lines) {
    const trimmed = item.trim();

    if (pattern.test(trimmed)) {
      return trimmed.replace(pattern, "").trim();
    }
  }

  return null;
}

function readTitularValue(lines: string[]) {
  return (
    readLabelValue(lines, "Titular") ??
    readLabelValue(lines, "Titular(es)") ??
    readLabelValue(lines, "Despachante") ??
    readLabelValue(lines, "Requerente")
  );
}

function readBlockValue(lines: string[], label: string) {
  const pattern = new RegExp(`^${label.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}:\\s*`, "i");
  const startIndex = lines.findIndex((item) => pattern.test(item.trim()));

  if (startIndex < 0) return null;

  const parts: string[] = [];
  const firstLine = lines[startIndex].trim();
  const firstContent = firstLine.replace(pattern, "").trim();

  if (firstContent) {
    parts.push(firstContent);
  }

  for (let i = startIndex + 1; i < lines.length; i++) {
    const current = lines[i].trim();

    if (!current) continue;

    if (
      isProcessStart(current) ||
      /^(Titular|Data de depósito|Data de recebimento pelo INPI|Número da Inscrição Internacional|Apresentação|Natureza|Elemento nominativo|NCL\(11\)|Especificação):/i.test(current)
    ) {
      break;
    }

    parts.push(current);
  }

  return parts.join(" ").replace(/\s+/g, " ").trim() || null;
}

function splitProcesses(text: string) {
  const lines = text.split("\n");
  const processes: string[] = [];
  let current: string[] = [];

  for (let index = 0; index < lines.length; index++) {
    const trimmed = lines[index].trim();
    const lookahead = lines.slice(index + 1, index + 4).map((item) => item.trim());

    if (!trimmed) continue;

    if (isProcessStart(trimmed, lookahead)) {
      if (current.length > 0) {
        processes.push(current.join("\n"));
      }

      current = [lines[index]];
      continue;
    }

    current.push(lines[index]);
  }

  if (current.length > 0) {
    processes.push(current.join("\n"));
  }

  return processes;
}

function inferProcessTypeName(title: string) {
  const cleaned = title.trim();
  return PROCESS_BRAND_TYPES.find(({ regex }) => regex.test(cleaned))?.processType ?? "Outros";
}

function parseProcessEntry(raw: string) {
  const lines = raw.split("\n").map((line) => line.trimEnd());

  const firstLineIndex = lines.findIndex((line, index) => {
    const lookahead = lines.slice(index + 1, index + 4).map((item) => item.trim());
    return isProcessStart(line.trim(), lookahead);
  });

  const firstLine = firstLineIndex >= 0 ? lines[firstLineIndex] : "";
  const processNumber = firstLine.match(/^(\d{6,})/)?.[1] ?? null;

  const lookahead =
    firstLineIndex >= 0
      ? lines.slice(firstLineIndex + 1, firstLineIndex + 4).map((item) => item.trim())
      : [];

  const title = getTitleFromLine(firstLine, lookahead) ?? "Sem título";

  return {
    processTypeId: '0dbb4150-4d74-4723-8bb7-c8993471654e',
    processNumber,
    title,
    titular: readTitularValue(lines),
    dispatchDescription: readBlockValue(lines, "Detalhes do despacho"),
    publishDate: parseBrazilianDate(readLabelValue(lines, "Data de depósito")),
    grantingDate: parseBrazilianDate(readLabelValue(lines, "Data de concessão")),
    dueDate: addYears(parseBrazilianDate(readLabelValue(lines, "Data de concessão")), 10),
    depositDate: parseBrazilianDate(readLabelValue(lines, "Data de depósito")),
    receiptDate: parseBrazilianDate(readLabelValue(lines, "Data de recebimento pelo INPI")),
    internationalRegistration: readLabelValue(lines, "Número da Inscrição Internacional"),
    presentation: readLabelValue(lines, "Apresentação"),
    nature: readLabelValue(lines, "Natureza"),
    brand: readLabelValue(lines, "Marca"),
    nominativeElement: readLabelValue(lines, "Elemento nominativo"),
    ncl: readLabelValue(lines, "NCL(11)"),
    specification: readBlockValue(lines, "Especificação"),
    sourceText: raw.trim(),
    processTypeName: inferProcessTypeName(title),
  };
}

async function ensureProcessType(name: string) {
  const slug = normalizeSlug(name);

  return prisma.processType.upsert({
    where: { slug },
    update: { name },
    create: {
      slug,
      name,
      description: `Tipo importado automaticamente para ${name}`,
    },
  });
}