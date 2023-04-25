import Eris, { Guild, Member, Message } from "eris";
import * as dotenv from 'dotenv'
dotenv.config()
let token: string = process.env.TOKEN
let channelIds: string[] = [];
const bot = new Eris.Client(token);

bot.on("ready", () => {
    console.log("Ready!");
});

bot.on("messageCreate", (msg: Message) => {
    if (msg.content === "!ping") {
        bot.createMessage(msg.channel.id, "Pong!");
    }
});

bot.on("voiceChannelJoin", (member: Member, server: Guild) => {
    console.log(member);
    let VcChannel: string = server.id;
    if (channelIds.includes(VcChannel)) {
        bot.createMessage(VcChannel, `A timer is already set for this channel, <@${member.id}>`);
        return;
    }
    channelIds.push(VcChannel);
    bot.createMessage(VcChannel, `Waiting 1 minute to ping. <@${member.id}>`);
    setTimeout(() => {
        bot.createMessage(VcChannel, "A call has started! <@&1091919355262025781>");
        const index = channelIds.indexOf(VcChannel);
        if (index > -1) {
            channelIds.splice(index, 1);
        }
    }, 60000);
});

bot.connect();

