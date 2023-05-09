import { Client } from "eris";
import { serverObj } from "../structures/dataJson";
import { jsonData, updateDb } from "../util/database";

// create default function
export default (client: Client) => {
  client.guilds.forEach(async function (guild) {
    if (!jsonData.hasOwnProperty(guild.id)) {
      // create an empty server object for this guild and add it to the data object
      const roleIdentifier = await client.createRole(guild.id, { name: "Server VC Ping" });
      const serverObj: serverObj = { roleId: roleIdentifier.id, delay: 120000 };
      jsonData[guild.id] = serverObj;
      // write updated file
      updateDb(jsonData);
    }
  });
};
