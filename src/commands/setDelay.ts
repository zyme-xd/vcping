import { Client, CommandInteraction } from "eris";

export const info = {
  name: "setDelay",
  description: "Set the delay VcPing waits before pinging in your server.",
  disabled: false,
  options: [],
};

export async function run(_client: Client, interaction: CommandInteraction): Promise<void> {
  await interaction.createMessage("Unimplemented.");
}
