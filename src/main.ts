import Eris, { Guild, Member, Message } from "eris";
import * as dotenv from 'dotenv'
dotenv.config()
let token: string = process.env.TOKEN
const bot = new Eris.Client(token);

bot.on("ready", () => {
    console.log("Ready!");
});

bot.on("messageCreate", (msg: Message) => {
    if (msg.content === "!ping") {
        bot.createMessage(msg.channel.id, "Pong!");
    }
});

bot.on("voiceChannelJoin", (_member: Member, server: Guild) => {
    let VcChannel: string = server.id
    bot.createMessage(VcChannel, "Waiting to ping... (1 Minute)")
    setTimeout(() => {
        bot.createMessage(VcChannel, "A call has started! <@&1091919355262025781>")
    }, 60000);
})

bot.connect();

