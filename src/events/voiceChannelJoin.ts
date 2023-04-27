import { Client, Member, VoiceChannel } from "eris";

export default (bot: Client, member: Member, vc: VoiceChannel) => {
  let usersInVc = Array.from(vc.voiceMembers.values()).length; // converts iterable to array, then gets value of length
  let vcChannel: string = vc.id;
  console.log(`${member.id} has joined the channel ${vc.id}`);
  // designed to prevent double pings
  if (usersInVc > 1) {
    console.log("Timer has not started, as one is already ongoing for this channel.");
  } else {
    bot.createMessage(vcChannel, `Waiting 1 minute to ping. <@${member.id}>`);
    setTimeout(() => {
      bot.createMessage(vcChannel, "A call has started! <@&1091919355262025781>");
    }, 60000);
  }
};
