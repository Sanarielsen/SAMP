export interface MagazineParserResult {
  text: string;
}

export interface MagazineParser {
  parse(file: Buffer): Promise<MagazineParserResult>;
}