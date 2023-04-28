import { Client, CommandInteraction } from "eris";

export const info = {
  name: "setRole",
  description: "Set the role VcPing notifies for your server.",
  disabled: false,
  options: [],
};

export async function run(_client: Client, interaction: CommandInteraction): Promise<void> {
  await interaction.createMessage("Unimplemented.");
}
