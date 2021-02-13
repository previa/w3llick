import { pathToArray } from "graphql/jsutils/Path";
import path from "path";

export function getPosterPath(id: number): string {
  return "http://localhost:9091/images/" + id.toString() + "/poster";
}
