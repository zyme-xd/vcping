import Eris, {} from "eris";  
import fs, {} from "fs"
import * as dotenv from 'dotenv'
dotenv.config()
let token: string = process.env.TOKEN
const bot = new Eris.Client(token);
let commandlist: Map<any,any> = new Map() // initializes map that stores commands

// command handler
for (let file of fs.readdirSync(`${__dirname}/commands`)) {
	if (!file.endsWith(".js")) continue // if not .js skip over
	commandlist.set(file.split(".")[0], require(`${__dirname}/commands/${file}`)) // set key as filename, value to export of command
}

// event handler
for (let file of fs.readdirSync(`${__dirname}/events`)) {
	if (!file.endsWith(".js")) continue
	bot.on(file.split(".")[0], require(`${__dirname}/events/${file}`).default.bind(null, bot)) // sets name to filename, binds default func to event
}

bot.once("ready", async () => {
    console.log(`[Discord] Logged into ${bot.user.username}#${bot.user.discriminator}`)
    const slashCommands = await bot.getCommands()

    // if command is unregistered, register command
    commandlist.forEach(async (_value,key) => {
		if (!slashCommands.find((_) => _.name == key)) {
			console.log(`[Discord] Registering ${key}`)
			const cmd = commandlist.get(key)
			await bot.createCommand(cmd.info)
		}
	})
	
	// if the command no longer exists, unregister command
    slashCommands.forEach(async (cmd) => {
		if (!Object.fromEntries(commandlist)[cmd.name]) {
			console.log(`[Discord] Deleting ${cmd.name}`)
			await bot.deleteCommand(cmd.id)
		}
	})
});
export {commandlist} // exports commandlist so interactioncreate can reference it

bot.connect();
