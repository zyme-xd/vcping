import { Client, CommandInteraction } from "eris";
import { jsonData, updateDb } from "../util/database";

export const info = {
  name: "setchannelrole",
  description: "Set a designated role to ping for a specific voice channel.",
  disabled: false,
  options: [
    { name: "roleid", description: "The role ID.", type: 3, required: true },
    { name: "channelid", description: "The channel ID.", type: 3, required: true },
  ],
};

export async function run(client: Client, interaction: CommandInteraction): Promise<void> {
  const optionsData = interaction.data.options;
  const isAdmin = interaction.member?.permissions.has("administrator"); // admin check
  const roleId = optionsData?.[0]?.type === 3 ? optionsData?.[0].value : null;
  const channelId = optionsData?.[1]?.type === 3 ? optionsData?.[1].value : null;
  const roles = client.guilds?.get(`${interaction.guildID}`)?.roles; // get server roles (used to validate roleid entered)
  const server: string = interaction.guildID as string;

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

  // check if both `roleId` and `channelId` are strings
  if (typeof roleId === "string" && typeof channelId === "string") {
    // find the channel role in the `channelRoles` array that matches the `channelId`
    const existingChannelRole = jsonData[server]?.channelRoles?.find((channelRole) => channelRole.voiceChannel === channelId);

    // if the `existingChannelRole` already exists, update its `role` property instead of creating a new entry
    if (existingChannelRole) {
      existingChannelRole.role = roleId;
    } else {
      // otherwise, create a new channel role object
      const channelRole = {
        voiceChannel: channelId,
        role: roleId,
      };

      // check if `jsonData[server].channelRoles` exists and is an array
      if (jsonData[server].channelRoles && Array.isArray(jsonData[server].channelRoles)) {
        jsonData[server].channelRoles?.push(channelRole);
      } else {
        jsonData[server].channelRoles = [channelRole];
      }
    }
  }
  
  // write updated file
  updateDb(jsonData);
  await interaction.createFollowup(`Set to ping <@&${roleId}> when a vc starts in <#${channelId}>.`);
}
