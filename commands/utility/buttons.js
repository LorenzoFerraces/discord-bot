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

    const response = await interaction.reply({
      content: 'Por si o por no',
      components: [row],
     });

     const collectorFilter = i => i.user.id === interaction.user.id;

     try {
      const confirmation = await response.awaitMessageComponent({ filter: collectorFilter, time: 60000 });
      if (confirmation.customId === 'yes') {
        await confirmation.update({
          content: `${interaction.user} vota por si`, components: [] });
      } else if (confirmation.customId === 'no') {
        await confirmation.update({
        content: `${interaction.user} vota por no`, components: [] });}
    } catch (e) {
      await interaction.editReply({ content: 'Confirmation not received within 1 minute, cancelling', components: [] });
    }
  },
};