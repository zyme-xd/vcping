import { Client, Guild } from "eris";
import { ServerObj } from "../structures/dataJson";
import * as path from "path";
import * as fs from "fs";

// create default function
export default (_client: Client, guild: Guild) => {
  console.log(guild.id);
  const dataFilePath: string = path.join(__dirname, "..", "data.json");

  // parse the contents of the data file into a JSON object
  const data: { [key: string]: ServerObj } = JSON.parse(fs.readFileSync(dataFilePath, "utf8"));

  // create an empty server object for this guild and add it to the data object
  const serverObj: ServerObj = {};
  data[guild.id] = serverObj;

  // write updated file
  try {
    fs.writeFileSync(dataFilePath, JSON.stringify(data));
    console.log(`Updated ${dataFilePath}`);
  } catch (err) {
    console.error(`Error updating ${dataFilePath}: ${err}`);
  }
};
