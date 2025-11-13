class BaseFetch {
  public baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  public async get<T extends object>(path: string): Promise<T> {
    const url = `${this.baseUrl}${path}`;
    try {
      const response = await fetch(url);
      return await response.json();
    } catch (error) {
      throw error;
    }
  }
}

export const fetcher = new BaseFetch('https://dummyjson.com');