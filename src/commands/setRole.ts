import { Client, CommandInteraction } from "eris";

// THIS IS THE WORST THING EVER
function isRoleOption(option: any): option is { value: string } {
  return option && typeof option.value === "string";
}

function getRoleValue(optionsData: any): string | null {
  if (Array.isArray(optionsData) && optionsData.length > 0 && isRoleOption(optionsData[0])) {
    return optionsData[0].value.toString();
  } else {
    return null;
  }
}

export const info = {
  name: "setrole",
  description: "Set the role VcPing notifies for your server.",
  disabled: false,
  options: [{ name: "roleid", description: "The role ID.", type: 3, required: true }],
};

export async function run(client: Client, interaction: CommandInteraction): Promise<void> {
  const optionsData = interaction.data.options;
  const isAdmin = interaction.member?.permissions.has("administrator");
  const roleId = getRoleValue(optionsData);
  const roles = client.guilds?.get(`${interaction.guildID}`)?.roles;

  await interaction.acknowledge(64);

  if (!isAdmin) {
    await interaction.createFollowup("You do not have permission to run this command!!");
    return;
  }

  if (roleId) {
    let checkedValue = parseInt(roleId);
    if (Number.isNaN(checkedValue) || !roles?.has(roleId)) {
      // checks if input is a valid number and if it actually exists
      await interaction.createFollowup(`Invalid input.`);
      return;
    }
    await interaction.createFollowup(`Unimplemented. ${checkedValue}`);
  }
}
