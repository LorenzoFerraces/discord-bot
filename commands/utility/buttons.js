const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
  cooldwon: 5,
  data: new SlashCommandBuilder()
    .setName('buttons')
    .setDescription('display some buttons'),
  async execute(interaction) {

    const yes = new ButtonBuilder()
      .setCustomId('yes')
      .setLabel('Yes')
      .setStyle(ButtonStyle.Success);

    const no = new ButtonBuilder()
      .setCustomId('no')
      .setLabel('No')
      .setStyle(ButtonStyle.Danger);

    const row = new ActionRowBuilder()
      .addComponents(yes, no);

    await interaction.reply({ components: [row] });
  },
};