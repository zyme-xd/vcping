import { Client, Member, VoiceChannel } from "eris";
import { ServerObj } from "../structures/dataJson";
import * as path from "path";
import * as fs from "fs";
import { msToTime } from "../util/timeConv";
// import { jsonData } from "../util/database";

export default async (bot: Client, member: Member, vc: VoiceChannel) => {
  const dataFilePath: string = path.join(__dirname, "..", "data.json");
  const data: { [key: string]: ServerObj } = JSON.parse(fs.readFileSync(dataFilePath, "utf8"));
  // const server: string = vc.guild.id
  let usersInVc = Array.from(vc.voiceMembers.values()).length; // converts iterable to array, then gets value of length
  let vcChannel: string = vc.id;
  let guildData = data[vc.guild.id];

  async function updateVcUserCount() {
    usersInVc = Array.from(vc.voiceMembers.values()).length;
  }

  async function delay(ms: number) {
    await new Promise((resolve) => setTimeout(resolve, ms));
  }

  console.log(`[Discord] ${member.id} has joined the channel ${vc.id} in the server ${vc.guild.id}`);

  // check if the voice channel belongs to a channel role
  const matchingChannelRole = guildData.channelRoles?.find((channelRole) => channelRole.voiceChannel === vcChannel);

  if (matchingChannelRole) {
    // if a matching channel role is found, assign its role ID to guildData.roleId
    guildData.roleId = matchingChannelRole.role;
  }

  // designed to prevent unneeded pings
  if (usersInVc <= 1) { {
    bot.createMessage(vcChannel, `Waiting ${msToTime(guildData.delay)} to ping. <@${member.id}>`);
    await delay(guildData.delay);
    updateVcUserCount();
    if (usersInVc !== 0) {
      bot.createMessage(vcChannel, `A call has started! <@&${guildData.roleId}>`);
    } else {
      console.log("[Discord] Timer initiator no longer present, ping not sent.");
    }
  }
}}
