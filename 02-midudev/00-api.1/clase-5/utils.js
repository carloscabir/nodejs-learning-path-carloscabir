import { createRequire } from "node:module";

const require = createRequire(import.meta.url)

export const readJSON = (path) => require(path)


export const URLFiltersGenerator = (filters) => {
  let urlFilters = "";

  for (const filter in filters) {
    if (!filters.hasOwnProperty(filter)) return;

    urlFilters += `&${filter}=${filters[filter]}`;
  }

  return urlFilters;
};