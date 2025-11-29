import "server-only";

import { HttpClient } from "./HttpClient";

export const cmsApi = new HttpClient("https://nextjs-sandbox.microcms.io/api/v1", {
  headers: {
    "X-MICROCMS-API-KEY": process.env.MICROCMS_API_KEY,
  },
});
