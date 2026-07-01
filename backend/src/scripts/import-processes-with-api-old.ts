import { readFileSync } from "node:fs";
import path from "node:path";
import { PrismaClient } from "@prisma/client";
import { addYears } from "@/utils/addYears";
import { PROCESS_BRAND_TYPES } from "@/utils/mockProcessTypeBrands";

const prisma = new PrismaClient();

let typeTitles: string[] = []

async function main() {
  const filePath = process.argv[2];

  await importProcessesWithAPI(filePath);
}

if (require.main === module) {
  main()
    .catch(console.error)
    .finally(async () => {
      await prisma.$disconnect();
  });
}

export async function importProcessesWithAPI(filePath: string) {
  // const args = process.argv.slice(2);

  // const dryRun = args.includes("--dry-run");
  // const clientIdFlag = args.find((arg) => arg.startsWith("--client-id="));
  const clientId = null;

  // const inputPath = args.find((arg) => !arg.startsWith("--")) ?? "resultado.txt";
  // const absolutePath = path.resolve(process.cwd(), inputPath);

  // if (!absolutePath) {
  //   console.error("Please provide a file path.");
  //   process.exit(1);
  // }

  //filePath instead of absolutePath
  const text = readFileSync(filePath, "utf-8");
  const processes = splitProcesses(text);

  console.log(`Found ${processes.length} process entries in ${filePath}`);

  for (const raw of processes) {
    const parsed = parseProcessEntry(raw);

    if (!parsed.processNumber) {
      continue;
    }

    const processType = await ensureProcessType(parsed.processTypeName);

    // if (dryRun) {
    //   console.log(`DRY RUN -> ${parsed.processNumber} | ${parsed.title}`);
    //   continue;
// }

    const createdProcess = await prisma.process.create({
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

    if (clientId) {
      await prisma.clientProcess.create({
        data: {
          clientId,
          processId: createdProcess.id,
          notes: "Imported from resultado.txt",
        },
      });
    }

    console.log(`Imported process ${createdProcess.processNumber} -> ${createdProcess.id}`);
  }

  console.log("Finished.");
  console.log("All types found: ", JSON.stringify(typeTitles, null, 2));
}

const PROCESS_TITLE_PREFIXES = [
  "Exigência",
  "Publicação",
  "Republicação",
  "Notificação",
  "Exame",
  "Pedido",
  "Desistência",
  "Concessão",
  "Registro",
  "Renúncia",
  "Nulidade",
  "Caducidade",
  "Prorrogação",
  "Trâmite",
  "Anotação",
  "Recurso",
  "Outras",
  "Protocolo",
  "Anulação",
  "Disponibilidade",
  "Petição",
  "Processo",
  "Decisão",
  "Requerimento",
  "Indeferimento",
];

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

//v1
// function isProcessStart(line: string) {
//   const trimmed = line.trim();
//   return /^\d{6,}\s+/.test(trimmed) && !trimmed.startsWith("MARCAS -");
// }

//v2 - Todos os processos, porém com 5 estando nulos. (ESSE)
// function isProcessStart(line: string) {
//   const trimmed = line.trim();

//   return /^\d{6,}\s+[A-Za-zÀ-ÿ]/.test(trimmed);
// }

//v5 - Todos os processos, porém com 5 estando nulos. (ESSE)
// function isProcessStart(line: string) {
//   const trimmed = line.trim();
//   if (!trimmed) return false;

//   const match = trimmed.match(/^(\d{6,})(?:\s*)(.+)$/);
//   if (!match) return false;

//   const title = match[2].trim();
//   if (!title) return false;

//   return PROCESS_BRAND_TYPES.some(({ regex }) => regex.test(title));
// }

//v6
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

  return false;
}

//v3 - poucos processos
// function isProcessStart(line: string) {
//   const trimmed = line.trim();

//   return /^\d{6,}\s*(Exigência|Publicação|Republicação|Notificação|Exame|Pedido|Desistência|Concessão|Registro|Renúncia|Nulidade|Caducidade|Prorrogação|Trâmite|Anotação|Recurso|Outras|Protocolo|Anulação|Disponibilidade|Petição|Processo|Decisão)\b/i.test(trimmed);
// }

//v4 - Processos corretos, mas diminui 50% do total do v2. (OU ESSE)
// function isProcessStart(line: string) {
//   const trimmed = line.trim();
//   const match = trimmed.match(/^(\d{6,})(?:\s*)(.+)$/);

//   if (!match) return false;

//   const title = match[2].trim();
//   if (!title) return false;

//   return PROCESS_TITLE_PREFIXES.some((prefix) =>
//     title.toLowerCase().startsWith(prefix.toLowerCase())
//   );
// }

// function getTitleFromLine(line: string) {
//   const trimmed = line.trim();
//   const match = trimmed.match(/^\d{6,}\s+(.*)$/);
//   return match?.[1]?.trim() ?? null;
// }

//v2
// function getTitleFromLine(line: string) {
//   const trimmed = line.trim();
//   const match = trimmed.match(/^(\d{6,})\s+(.+)$/);

//   return match?.[2]?.trim() ?? null;
// }

//v1
// function getTitleFromLine(line: string) {
//   const trimmed = line.trim();
//   const match = trimmed.match(/^(\d{6,})\s*(.+)$/);

//   return match?.[2]?.trim() ?? null;
// }

function getTitleFromLine(line: string) {
  const trimmed = line.trim();
  const match = trimmed.match(/^(\d{6,})(?:\s*)(.+)$/);

  if (!match) return null;

  const rawTitle = match[2].trim();
  return PROCESS_BRAND_TYPES.find(({ regex }) => regex.test(rawTitle))?.title ?? rawTitle;
}

//v1
// function readLabelValue(lines: string[], label: string) {
//   const pattern = new RegExp(`^${label.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}:\\s*`, "i");
//   const line = lines.find((item) => pattern.test(item.trim()));

//   if (!line) return null;

//   return line.trim().replace(pattern, "").trim() || null;
// }

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

//v1
// function readTitularValue(lines: string[]) {
//   console.log("ATUAL: ", lines)
//   return readLabelValue(lines, "Titular") 
//   ?? readLabelValue(lines, "Titular(es)")
//   ?? readLabelValue(lines, "Titular(es):")
//   ?? readLabelValue(lines, "Despachante")
//   ?? readLabelValue(lines, "Requerente:");
// }

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

//v1
// function splitProcesses(text: string) {
//   const lines = text.split("\n");
//   const processes: string[] = [];
//   let current: string[] = [];

//   for (const line of lines) {
//     const trimmed = line.trim();

//     if (!trimmed) continue;

//     if (isProcessStart(trimmed)) {
//       if (current.length > 0) {
//         processes.push(current.join("\n"));
//       }

//       current = [line];
//       continue;
//     }

//     current.push(line);
//   }

//   if (current.length > 0) {
//     processes.push(current.join("\n"));
//   }

//   return processes;
// }

//v2
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

//v1
// function inferProcessTypeName(title: string) {
//   const normalized = title.toLowerCase();

//   if (normalized.includes("exigência formal")) return "Exigência formal";
//   if (normalized.includes("publicação")) return "Publicação de pedido para oposição";
//   if (normalized.includes("republicação")) return "Republicação de pedido para oposição";
//   if (normalized.includes("oposição")) return "Notificação de oposição para manifestação";
//   if (normalized.includes("exame de mérito") && normalized.includes("exigência")) return "Exame de mérito: Exigência";
//   if (normalized.includes("exame de mérito") && normalized.includes("sobrestamento")) return "Exame de mérito: Sobrestamento";
//   if (normalized.includes("exame de mérito") && normalized.includes("indeferimento")) return "Exame de mérito: Indeferimento";
//   if (normalized.includes("exame de mérito") && normalized.includes("deferimento parcial")) return "Exame de mérito: Deferimento parcial";
//   if (normalized.includes("exame de mérito") && normalized.includes("deferimento")) return "Exame de mérito: Deferimento";
//   if (normalized.includes("concessão")) return "Concessão de registro de marca";
//   if (normalized.includes("extinto")) return "Registro de marca extinto";
//   if (normalized.includes("cancelado")) return "Registro de marca cancelado de ofício";
//   if (normalized.includes("renúncia")) return "Renúncia a registro de marca";
//   if (normalized.includes("nulidade")) return "Nulidade administrativa de registro de marca";
//   if (normalized.includes("caducidade")) return "Caducidade de registro de marca";
//   if (normalized.includes("prorrogação")) return "Prorrogação de registro de marca";
//   if (normalized.includes("trâmite prioritário")) return "Trâmite prioritário de marcas";
//   if (normalized.includes("recurso")) return "Recursos";
//   if (normalized.includes("madri")) return "Protocolo de Madri";

//   return "Outros";
// }

function inferProcessTypeName(title: string) {
  const cleaned = title.trim();
  return PROCESS_BRAND_TYPES.find(({ regex }) => regex.test(cleaned))?.processType ?? "Outros";
}

function parseProcessEntry(raw: string) {
  const lines = raw
    .split("\n")
    .map((line) => line.trimEnd());

  const firstLine = lines.find((line) => isProcessStart(line.trim())) ?? "";
  const processNumber = firstLine.match(/^(\d{6,})/)?.[1] ?? null;
  const title = getTitleFromLine(firstLine) ?? "Sem título";

  if (!typeTitles.includes(title)) {
    typeTitles.push(title)
  }

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