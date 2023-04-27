import Eris from "eris";
import fs from "fs";
import * as dotenv from "dotenv";
dotenv.config();
let token: string = process.env.TOKEN;
const bot = new Eris.Client(token);
let commandlist: Map<any, any> = new Map(); // initializes map that stores commands

// command handler - reads and imports all command files in the /commands directory
for (let file of fs.readdirSync(`${__dirname}/commands`)) {
  // if file does not have .js extension, skip over it
  if (!file.endsWith(".js")) continue;
  // set commandlist key as filename without .js extension and value to exported command module
  commandlist.set(file.split(".")[0], require(`${__dirname}/commands/${file}`));
}

// event handler - reads and imports all event files in the /events directory
for (let file of fs.readdirSync(`${__dirname}/events`)) {
  // if file does not have .js extension, skip over it
  if (!file.endsWith(".js")) continue;
  // set bot event listener based on filename and bind default function to event
  bot.on(
    file.split(".")[0],
    require(`${__dirname}/events/${file}`).default.bind(null, bot)
  );
}

bot.once("ready", async () => {
  console.log(
    `[Discord] Logged into ${bot.user.username}#${bot.user.discriminator}`
  );
  const slashCommands = await bot.getCommands();

  // Register any unregistered commands
  commandlist.forEach(async (_value, key) => {
    // If the command is not found in the list of registered commands, register it
    if (!slashCommands.find((_) => _.name == key)) {
      console.log(`[Discord] Registering ${key}`);
      // Get the command info from the commandlist and register the command
      const cmd = commandlist.get(key);
      await bot.createCommand(cmd.info);
    }
  });

  // Unregister any commands that no longer exist
  slashCommands.forEach(async (cmd) => {
    // If the command is not found in the list of command modules, unregister it
    if (!Object.fromEntries(commandlist)[cmd.name]) {
      console.log(`[Discord] Deleting ${cmd.name}`);
      await bot.deleteCommand(cmd.id);
    }
  });
});
// export commandlist so interactioncreate can reference it
export { commandlist };

bot.connect();
