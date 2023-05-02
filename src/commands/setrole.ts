import { Client, CommandInteraction } from "eris";
import { ServerObj } from "../structures/dataJson";
import * as path from "path";
import * as fs from "fs";

export const info = {
  name: "setrole",
  description: "Set the role Vc Ping notifies for your server.",
  disabled: false,
  options: [{ name: "roleid", description: "The role ID.", type: 3, required: true }],
};

export async function run(client: Client, interaction: CommandInteraction): Promise<void> {
  const optionsData = interaction.data.options;
  const isAdmin = interaction.member?.permissions.has("administrator"); // admin check
  const roleId = optionsData?.[0]?.type === 3 ? optionsData?.[0].value : null; // get roleid from optionsdata through narrowing
  const roles = client.guilds?.get(`${interaction.guildID}`)?.roles; // get server roles (used to validate roleid entered)
  const server: string = interaction.guildID as string;
  const dataFilePath: string = path.join(__dirname, "..", "data.json");
  let data: { [key: string]: ServerObj } = JSON.parse(fs.readFileSync(dataFilePath, "utf8"));


  await interaction.acknowledge(64);

  // if user is not an administrator, send an error message and return
  if (!isAdmin) {
    await interaction.createFollowup("You do not have permission to run this command!!");
    return;
  }

  // if a valid role ID is provided, continue as normal
  if (Number.isNaN(roleId!) || !roles?.has(roleId!)) {
    await interaction.createFollowup("Invalid input. If you mentioned a role, copy the ID instead of mentioning it.");
    return;
  }

  // if roleid is not set to the value given
  if(roleId! !== data[server].roleId){
    data[server].roleId = roleId! // set role
  }else{
    await interaction.createFollowup("The role is already set to this value.") // avoid writing if unneeded
    return
  }
  

  // write updated file
  try {
    fs.writeFileSync(dataFilePath, JSON.stringify(data));
    console.log(`[Database] Updated ${dataFilePath}`);
  } catch (err) {
    console.error(`[Database] Error updating ${dataFilePath}: ${err}`);
  }
  await interaction.createFollowup(`Set role to <@&${data[server].roleId.toString()}>.`);
}
