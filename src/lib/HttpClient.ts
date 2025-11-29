type Options = Omit<RequestInit, "method" | "body">;

export class HttpClient {
  constructor(
    private baseUrl: string,
    private defaultOptions?: Options,
  ) {}

  private mergeOptions(options?: Options): Options {
    return {
      ...this.defaultOptions,
      ...options,
      headers: {
        ...this.defaultOptions?.headers,
        ...options?.headers,
      },
    };
  }

  async get<Result>(path: string, options?: Options): Promise<Result> {
    const res = await fetch(`${this.baseUrl}${path}`, {
      method: "GET",
      ...this.mergeOptions(options),
    });
    if (!res.ok) throw new Error(`Fetch error: ${res.status}`);
    return res.json() as Promise<Result>;
  }

  async post<Result, Body = unknown>(path: string, body: Body, options?: Options): Promise<Result> {
    const merged = this.mergeOptions(options);
    const res = await fetch(`${this.baseUrl}${path}`, {
      method: "POST",
      ...merged,
      headers: { "Content-Type": "application/json", ...merged.headers },
      body: JSON.stringify(body),
    });
    if (!res.ok) throw new Error(`Fetch error: ${res.status}`);
    return res.json() as Promise<Result>;
  }

  async put<Result, Body = unknown>(path: string, body: Body, options?: Options): Promise<Result> {
    const merged = this.mergeOptions(options);
    const res = await fetch(`${this.baseUrl}${path}`, {
      method: "PUT",
      ...merged,
      headers: { "Content-Type": "application/json", ...merged.headers },
      body: JSON.stringify(body),
    });
    if (!res.ok) throw new Error(`Fetch error: ${res.status}`);
    return res.json() as Promise<Result>;
  }

  async patch<Result, Body = unknown>(path: string, body: Body, options?: Options): Promise<Result> {
    const merged = this.mergeOptions(options);
    const res = await fetch(`${this.baseUrl}${path}`, {
      method: "PATCH",
      ...merged,
      headers: { "Content-Type": "application/json", ...merged.headers },
      body: JSON.stringify(body),
    });
    if (!res.ok) throw new Error(`Fetch error: ${res.status}`);
    return res.json() as Promise<Result>;
  }

  async delete<Result>(path: string, options?: Options): Promise<Result> {
    const res = await fetch(`${this.baseUrl}${path}`, {
      method: "DELETE",
      ...this.mergeOptions(options),
    });
    if (!res.ok) throw new Error(`Fetch error: ${res.status}`);
    return res.json() as Promise<Result>;
  }
}
