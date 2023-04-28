import { Client } from "eris";
import { ServerObj } from "../structures/dataJson";
import * as path from "path";
import * as fs from "fs";

// create default function
export default (client: Client) => {
  const dataFilePath: string = path.join(__dirname, "..", "data.json");

  // parse the contents of the data file into a JSON object
  const data: { [key: string]: ServerObj } = JSON.parse(fs.readFileSync(dataFilePath, "utf8"));

  client.guilds.forEach(function (guild) {
    if (data.hasOwnProperty(guild.id)) {
      console.log("[Discord] Entry already exists, skip over.");
    } else {
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
    }
  });
};
