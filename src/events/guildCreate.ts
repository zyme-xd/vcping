import { Client, Guild } from "eris";
import { serverObj } from "../structures/dataJson";
import { jsonData, updateDb } from "../util/database";

// create default function
export default async (client: Client, guild: Guild) => {
  // create an empty server object for this guild and add it to the data object
  const roleIdentifier = await client.createRole(guild.id, { name: "Server VC Ping" });
  const serverObj: serverObj = { roleId: roleIdentifier.id, delay: 120000 };
  jsonData[guild.id] = serverObj;
  // write updated file
  updateDb(jsonData);
};
