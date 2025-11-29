declare global {
  namespace NodeJS {
    interface ProcessEnv {
      MICROCMS_API_KEY: string;
    }
  }
}

export {};
