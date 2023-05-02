import { Client, CommandInteraction } from "eris";
import { jsonData, updateDb } from "../util/database";

export const info = {
  name: "setdelay",
  description: "Set the delay Vc Ping waits before pinging in your server.",
  disabled: false,
  options: [
    { name: "minutes", description: "The delay in minutes.", type: 4, required: false },
    { name: "seconds", description: "The delay in seconds.", type: 4, required: false },
  ],
};

export async function run(_client: Client, interaction: CommandInteraction): Promise<void> {
  const isAdmin = interaction.member?.permissions.has("administrator");
  const optionsData = interaction.data.options;
  const server: string = interaction.guildID as string;

  await interaction.acknowledge(64);

  if (!isAdmin) {
    await interaction.createFollowup("You do not have permission to run this command!!");
    return;
  }

  // checks if an input is actually received
  // idk if could be done more effectively, might change this out eventually (if discord api allows)
  if (!optionsData?.length) {
    await interaction.createFollowup("No input received.");
    return;
  }

  // calculate sum of options
  let delaySum: number = optionsData.reduce((sum: number, arg): number => {
    if (arg.type === 4) {
      arg.value;
      if (arg.name == "minutes") {
        sum += arg.value * 60000; // convert minutes into milliseconds
      } else if (arg.name == "seconds") {
        sum += arg.value * 1000; // convert seconds into milliseconds
      }
    }
    return sum;
  }, 0);

  // if delay is not set to the value given
  if (delaySum !== jsonData[server].delay) {
    jsonData[server].delay = delaySum; // set server delay as sum
  } else {
    await interaction.createFollowup("The delay is already set to this value."); // avoid writing if unneeded
    return;
  }

  // write updated file
  updateDb(jsonData);

  await interaction.createMessage(`Delay time has been updated.`);
}
