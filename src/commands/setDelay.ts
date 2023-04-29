import { Client, CommandInteraction } from "eris";

export const info = {
  name: "setdelay",
  description: "Set the delay Vc Ping waits before pinging in your server.",
  disabled: false,
  options: [{ name: "delay", description: "The delay in minutes.", type: 3, required: true }],
};

export async function run(_client: Client, interaction: CommandInteraction): Promise<void> {
  const isAdmin = interaction.member?.permissions.has("administrator");

  await interaction.acknowledge(64);
 
  if (!isAdmin) {
    await interaction.createFollowup("You do not have permission to run this command!!");
    return;
  }

  await interaction.createMessage("Unimplemented.");
}
