import { Client, CommandInteraction } from "eris";

export const info = {
  name: "ping",
  description: "Pong!",
  disabled: false,
  options: [],
};

export async function run(_client: Client, interaction: CommandInteraction): Promise<void> {
  await interaction.acknowledge(64);
  await interaction.createFollowup("Pong!");
}
