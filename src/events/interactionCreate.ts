import { Client, CommandInteraction } from "eris"
import { commandlist } from "../main.js"

export default (client: Client, interaction: CommandInteraction) => {
  const { data } = interaction || {};
  const command = commandlist.get(data?.name);
  return command?.run(client, interaction);
}
