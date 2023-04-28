import { Client, CommandInteraction } from "eris";

export const info = {
  name: "setrole",
  description: "Set the role VcPing notifies for your server.",
  disabled: false,
  options: [],
};

export async function run(_client: Client, interaction: CommandInteraction): Promise<void> {
  await interaction.acknowledge(64);
  const isAdmin = interaction.member?.permissions.has("administrator");
  if (!isAdmin) {
    await interaction.createFollowup("You do not have permission to run this command!!");
    return;
  }
  await interaction.createFollowup("Unimplemented.");
}
