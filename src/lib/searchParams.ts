import { createSearchParamsCache, parseAsInteger } from "nuqs/server";

export { type SearchParams } from "nuqs/server";

export const searchParamsCache = createSearchParamsCache({
  page: parseAsInteger.withDefault(1),
});
