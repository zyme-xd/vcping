import { Client, Member, VoiceChannel } from "eris";
import { ServerObj } from "../structures/dataJson";
import * as path from "path";
import * as fs from "fs";

export default async (bot: Client, member: Member, vc: VoiceChannel) => {
  const dataFilePath: string = path.join(__dirname, "..", "data.json");
  const data: { [key: string]: ServerObj } = JSON.parse(fs.readFileSync(dataFilePath, "utf8"));
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

  // designed to prevent double pings
  if (usersInVc > 1) {
    console.log("[Discord] Timer has not started, as one is not needed.");
  } else {
    bot.createMessage(vcChannel, `Waiting 1 minute to ping. <@${member.id}>`);
    await delay(guildData.delay);
    updateVcUserCount();
    if (usersInVc !== 0) {
      console.log(guildData.roleId)
      bot.createMessage(vcChannel, `A call has started! <@&${guildData.roleId}>`);
    } else {
      console.log("[Discord] Timer initiator no longer present, ping not sent.");
    }
  }
};
