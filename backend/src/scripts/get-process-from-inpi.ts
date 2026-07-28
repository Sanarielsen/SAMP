export class INPIClient {
  private readonly baseUrl =
    "https://busca.inpi.gov.br/pePI/servlet";

  private cookies = new Map<string, string>();

  private getCookieHeader() {
    return [...this.cookies.entries()]
      .map(([name, value]) => `${name}=${value}`)
      .join("; ");
  }

  private storeCookies(response: Response) {
    const raw = response.headers.get("set-cookie");

    if (!raw) {
      return;
    }

    const cookies = raw.split(/,(?=\s*[A-Za-z0-9_-]+=)/);

    for (const cookie of cookies) {
      const pair = cookie.split(";")[0];

      const [name, ...value] = pair.split("=");

      this.cookies.set(name.trim(), value.join("=").trim());
    }
  }

  private async request(url: URL): Promise<string> {
    const headers: HeadersInit = {};

    const cookieHeader = this.getCookieHeader();

    if (cookieHeader) {
      headers.Cookie = cookieHeader;
    }

    const response = await fetch(url, {
      method: "GET",
      headers,
      redirect: "follow",
    });

    if (!response.ok) {
      throw new Error("INPI request failed");
    }

    this.storeCookies(response);

    // O INPI responde em ISO-8859-1 (Latin-1), não UTF-8.
    const buffer = await response.arrayBuffer();

    return Buffer.from(buffer).toString("latin1");
  }

  async login(): Promise<void> {
    const url = new URL(`${this.baseUrl}/LoginController`);

    url.searchParams.set("action", "login");

    await this.request(url);
  }

  async search(processNumber: string): Promise<string> {
    const url = new URL(`${this.baseUrl}/MarcasServletController`);

    url.searchParams.set("Action", "searchMarca");
    url.searchParams.set("NumPedido", processNumber);
    url.searchParams.set("Source", "OAMI");
    url.searchParams.set("tipoPesquisa", "BY_NUM_PROC");

    return this.request(url);
  }

  async detail(codPedido: string): Promise<string> {
    const url = new URL(`${this.baseUrl}/MarcasServletController`);

    url.searchParams.set("Action", "detail");
    url.searchParams.set("CodPedido", codPedido);

    return this.request(url);
  }
}