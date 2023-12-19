const { ActionRowBuilder, SlashCommandBuilder, ButtonBuilder, ButtonStyle, RoleSelectMenuBuilder } = require('discord.js');

// genera un pedido de consulta en un canal predeterminado

module.exports = {
  cooldwon: 5,
  data: new SlashCommandBuilder()
    .setName('consulta')
    .setDescription('genera un pedido de consulta'),

  async execute(interaction) {
    const menuCanal = new RoleSelectMenuBuilder()
      .setCustomId('canal')
      .setPlaceholder('elegi el canal para hacer la consulta');

    const botonCancelar = new ButtonBuilder()
      .setCustomId('cancelar')
      .setLabel('Cancelar')
      .setStyle(ButtonStyle.Danger);

      const rowColab = new ActionRowBuilder()
        .addComponents(menuCanal);

      const rowConsulta = new ActionRowBuilder()
        .addComponents(botonCancelar);

      const responseConsulta = await interaction.reply({
        content: 'La consulta fue enviada, toca el boton para cancelar',
        components: [rowConsulta],
      });

      const canal = await interaction.guild.channels.fetch('1186756489956831362');
      canal.send({
        content: `el usuario ${interaction.user.username} solicita una consulta`,
        components: [rowColab],
      });

      const collectorFilter = i => i.user.id === interaction.user.id;

     try {
      const confirmation = await responseConsulta.awaitMessageComponent({ filter: collectorFilter, time: 60000 });
      if (confirmation.customId === 'cancelar') {
        await confirmation.deleteReply();
      }} catch (e) {
      await interaction.editReply({ content: 'Confirmation not received within 1 minute, cancelling', components: [] });
    }


},
};