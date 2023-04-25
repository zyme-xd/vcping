import Eris, { Message } from "eris";
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

bot.connect();