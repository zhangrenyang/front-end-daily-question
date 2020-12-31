import * as path from "path";

export function getDayId(fileName: string): string {
  const basename = path.basename(fileName);
  const dayId = basename.slice(0, basename.indexOf("."));
  return dayId;
}
