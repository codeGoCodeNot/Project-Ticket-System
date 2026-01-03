import { closest } from "fastest-levenshtein";

const getActivePath = (
  path: string,
  paths: string[],
  ignorePaths?: string[]
) => {
  const closestPath = closest(path, paths.concat(ignorePaths || []));
  const index = paths.indexOf(closestPath);

  return { activeIndex: index, activePath: closestPath };
};

export default getActivePath;
