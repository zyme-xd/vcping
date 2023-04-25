import Eris, { Member, VoiceChannel } from "eris";
import * as dotenv from 'dotenv'
dotenv.config()
let token: string = process.env.TOKEN
const bot = new Eris.Client(token);

bot.on("ready", () => {
    console.log("Ready!");
});

bot.on("voiceChannelJoin", (member: Member, vc: VoiceChannel) => {
    let usersInVc = Array.from(vc.voiceMembers.values()).length // converts iterable to array, then gets value of length
    let VcChannel: string = vc.id;
    console.log(`${member.id} has joined the channel ${vc.id}`)
    // designed to prevent double pings
    if (usersInVc > 1) {
        console.log("Timer has not started, as one is already ongoing for this channel.")
    } else {
        bot.createMessage(VcChannel, `Waiting 1 minute to ping. <@${member.id}>`);
        setTimeout(() => {
            bot.createMessage(VcChannel, "A call has started! <@&1091919355262025781>");
        }, 60000);
    }
});

bot.connect();

