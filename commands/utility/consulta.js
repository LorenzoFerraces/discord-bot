const { ActionRowBuilder, ComponentType, SlashCommandBuilder, ButtonBuilder, ButtonStyle, RoleSelectMenuBuilder } = require('discord.js');

// genera un pedido de consulta en un canal predeterminado

module.exports = {
  cooldwon: 5,
  data: new SlashCommandBuilder()
    .setName('consulta')
    .setDescription('genera un pedido de consulta'),

  async execute(solicitud) {

    const miembro = solicitud.member;
    const nombreUsuario = solicitud.user.username;
    const canalColaboradores = '1186756489956831362';

    // crear el boton para elegir el canal asignado
    const menuCanal = new RoleSelectMenuBuilder()
      .setCustomId('canal')
      .setPlaceholder('elegi el canal para hacer la consulta');

    const rowColab = new ActionRowBuilder()
     .addComponents(menuCanal);

    // crear el boton para cancelar el pedido
    const botonCancelar = new ButtonBuilder()
      .setCustomId('cancelar')
      .setLabel('Cancelar')
      .setStyle(ButtonStyle.Danger);

      const rowConsulta = new ActionRowBuilder()
        .addComponents(botonCancelar);

      // espera la cancelacion del pedido
      const responseConsulta = await solicitud.reply({
        content: 'La consulta fue enviada, toca el boton para cancelar',
        components: [rowConsulta],
        ephemeral: true,
      });

      // envia el mensaje al canal de colaboradores y espera la asignacion
      const canal = await solicitud.guild.channels.fetch(canalColaboradores);
      const asignacion = await canal.send({
        content: `el usuario ${nombreUsuario} solicita una consulta`,
        components: [rowColab],
      });

      // crea un collector para recibir la respuesta de la asignacion
      const collector = asignacion.createMessageComponentCollector({
        componentType: ComponentType.RoleSelect,
        time: 3_600_000,
      });

      // asigna el rol elegido al usuario que invoco el comando
      collector.on('collect', async i => {
        const rolAsignado = i.values[0];
        miembro.roles.add(rolAsignado);
        asignacion.delete();
        await solicitud.editReply({
          // rolAsignado.name == undefined, buscar error
          content: `la solicitud fue aceptada por ${i.user.username} en el canal ${rolAsignado.name}`,
          components: [],
          ephemeral: true,
        });
      });


      // recibe la cancelacion y borra tanto la respuesta al mensaje
      // como el pedido en el canal de colaboradores
     try {
      const cancelacion = await responseConsulta.awaitMessageComponent({});
      if (cancelacion.customId === 'cancelar') {
        await asignacion.delete();
        await cancelacion.update({
          content: 'cancelado exitosamente',
          components: [],
          ephemeral: true,
        });
        console.log(`solicitud cancelada, id: ${cancelacion.id}`);
      }} catch (e) {
        console.log(e);
        await solicitud.editReply({ content: 'Confirmation not received within 1 minute, cancelling', components: [] });
    }


},
};