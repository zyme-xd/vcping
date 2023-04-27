import { Client, Guild } from "eris";
import * as fs from "fs";
import { ServerObj } from "../structures/dataJson";
import * as path from "path";

// create default function
export default (_client: Client, guild: Guild) => {
  console.log(guild.id);
  const dataFilePath = path.join(__dirname, "..", "data.json");

  // check if the data file exists
  const fileExists = fs.existsSync(dataFilePath);

  // if the file does not exist, create it
  if (!fileExists) {
    // create an empty JSON object and write it to the file
    const initialData: { [key: string]: ServerObj } = {};
    try {
      fs.writeFileSync(dataFilePath, JSON.stringify(initialData));
      console.log(`Created ${dataFilePath}`);
    } catch (err) {
      console.error(`Error creating ${dataFilePath}: ${err}`);
    }
  }
  // parse the contents of the data file into a JSON object
  const data: { [key: string]: ServerObj } = JSON.parse(fs.readFileSync(dataFilePath, "utf8"));
  
  // create an empty server object for this guild and add it to the data object
  const serverObj: ServerObj = {};
  data[guild.id] = serverObj;
  
  //write updated file 
  try {
    fs.writeFileSync(dataFilePath, JSON.stringify(data));
    console.log(`Updated ${dataFilePath}`);
  } catch (err) {
    console.error(`Error updating ${dataFilePath}: ${err}`);
  }
};
