import { PDFParse } from "pdf-parse";

import {
  MagazineParser,
  MagazineParserResult,
} from "@/repositories/magazine-parser-repository";

export class PDFParseMagazineParser implements MagazineParser {
  async parse(file: Buffer): Promise<MagazineParserResult> {

    const parser = new PDFParse({
      data: new Uint8Array(file),
    });

    const result = await parser.getText();

    return {
      text: result.text,
    };
  }
}