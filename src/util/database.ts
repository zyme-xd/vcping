import { ServerObj } from "../structures/dataJson";
import * as path from "path";
import * as fs from "fs";

export const dataFilePath: string = path.join(__dirname, "..", "data.json");
export let jsonData: { [key: string]: ServerObj } = JSON.parse(fs.readFileSync(dataFilePath, "utf8"));

export function updateDb(data: object) {
    try {
        fs.writeFileSync(dataFilePath, JSON.stringify(data));
        console.log(`[Database] Updated ${dataFilePath}`);
      } catch (err) {
        console.error(`[Database] Error updating ${dataFilePath}: ${err}`);
      }
}