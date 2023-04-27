import { Client, CommandInteraction } from "eris";
import { commandlist } from "../main.js";

// create default function
export default (client: Client, interaction: CommandInteraction) => {
  const { data } = interaction || {};
  const command = commandlist.get(data?.name); // get command from list based on name
  return command?.run(client, interaction); // call run method (if it exists)
};
