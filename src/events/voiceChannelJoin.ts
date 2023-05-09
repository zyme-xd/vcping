import { Client, Member, VoiceChannel } from "eris";
import { msToTime } from "../util/timeConv";
import { jsonData } from "../util/database";

export default async (bot: Client, member: Member, vc: VoiceChannel) => {
  let usersInVc = Array.from(vc.voiceMembers.values()).length; // converts iterable to array, then gets value of length
  let vcChannel: string = vc.id;
  let guildData = jsonData[vc.guild.id];
  let activeTimers: string[] = [];

  async function updateVcUserCount() {
    usersInVc = Array.from(vc.voiceMembers.values()).length;
  }

  async function delay(ms: number) {
    await new Promise((resolve) => setTimeout(resolve, ms));
  }

  console.log(`[VC] ${member.id} has joined the channel ${vc.id} in the server ${vc.guild.id}`);

  // check if the voice channel belongs to a channel role
  const matchingChannelRole = guildData.channelRoles?.find(
    (channelRole) => channelRole.voiceChannel === vcChannel
  );

  if (matchingChannelRole) {
    // if a matching channel role is found, assign its role ID to guildData.roleId
    guildData.roleId = matchingChannelRole.role;
  }

  // designed to prevent unneeded pings / timer spamming
  if (usersInVc <= 1 && !activeTimers.includes(vcChannel)) {
    bot.createMessage(vcChannel, `Waiting ${msToTime(guildData.delay)} to ping.`);
    activeTimers.push(vcChannel);
    console.log(
      `[VC] ${member.id} started timer in the channel ${vc.id} in the server ${vc.guild.id}`
    );
    await delay(guildData.delay);
    activeTimers.filter((timer) => !timer.includes(vcChannel));
    updateVcUserCount();
    if (usersInVc !== 0) {
      bot.createMessage(vcChannel, `A call has started! <@&${guildData.roleId}>`);
    } else {
      console.log("[VC] Timer initiator no longer present, ping not sent.");
    }
  }
};
