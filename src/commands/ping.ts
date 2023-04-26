import { Client, CommandInteraction } from "eris";

export const info = {
    name: "ping",
    description: "Pong!",
    disabled: false,
    options: []
};


export async function run(_client: Client, interaction: CommandInteraction) {
    await interaction.createMessage("Pong!")
}