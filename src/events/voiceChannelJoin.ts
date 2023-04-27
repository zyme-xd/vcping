import { Client, Member, VoiceChannel } from "eris";

export default async (bot: Client, member: Member, vc: VoiceChannel) => {
  let usersInVc = Array.from(vc.voiceMembers.values()).length; // converts iterable to array, then gets value of length
  let vcChannel: string = vc.id;
  async function updateVcUserCount(){
    usersInVc = Array.from(vc.voiceMembers.values()).length;
  }
  async function delay(ms: number) {
    await new Promise((resolve) => setTimeout(resolve, ms));
  }

  console.log(`[Discord] ${member.id} has joined the channel ${vc.id} in the server ${vc.guild.id}`);

  // designed to prevent double pings
  if (usersInVc > 1) {
    console.log("Timer has not started, as one is already ongoing for this channel.");
  } else {
    bot.createMessage(vcChannel, `Waiting 1 minute to ping. <@${member.id}>`);
    await delay(60000);
    updateVcUserCount()
    if (usersInVc > 0) {
      bot.createMessage(vcChannel, "A call has started! <@&1091919355262025781>");
    } else{
      console.log("[Discord] Timer initiator no longer present, ping not sent.")
    }
  }
};
