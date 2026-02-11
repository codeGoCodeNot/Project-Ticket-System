import {
  createSearchParamsCache,
  parseAsInteger,
  parseAsString,
  parseAsStringLiteral,
} from "nuqs/server";

export const searchParser = parseAsString.withDefault("").withOptions({
  shallow: false,
  clearOnDefault: true,
});

export const sortParser = {
  sortKey: parseAsString.withDefault("createdAt"),
  sortValue: parseAsString.withDefault("desc"),
};

export const sortOptions = {
  shallow: false,
  clearOnDefault: true,
};

export const paginationParser = {
  page: parseAsInteger.withDefault(0),
  size: parseAsInteger.withDefault(2),
};

export const paginationOptions = {
  shallow: false,
  clearOnDefault: true,
};

export const filterParser = parseAsStringLiteral(["all", "active"] as const)
  .withDefault("all")
  .withOptions({
    shallow: false,
    clearOnDefault: true,
  });

export const searchParamsCache = createSearchParamsCache({
  search: searchParser,
  ...sortParser,
  ...paginationParser,
  filter: filterParser,
});

export type ParsedSearchParams = Awaited<
  ReturnType<typeof searchParamsCache.parse>
>;
