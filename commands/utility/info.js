const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  cooldwon: 5,
  data: new SlashCommandBuilder()
    .setName('info')
    .setDescription('get info about user or server')
    .addSubcommand(subcommand =>
        subcommand
            .setName('user')
            .setDescription('info about the user')
            .addUserOption(option => option.setName('target').setDescription('The user')))
    .addSubcommand(subcommand =>
        subcommand
            .setName('server')
            .setDescription('Info about the server')),
  async execute(interaction) {
    if (interaction.options.getSubcommand() === 'user') {
      const user = interaction.options.getUser('target');

      if (user) {
        await interaction.reply(`Username: ${user.username}\nID: ${user.id}`);
      } else {
        await interaction.reply(`Your username: ${interaction.user.username}\nYour ID: ${interaction.user.id}`);
      }
    } else if (interaction.options.getSubcommand() === 'server') {
      await interaction.reply(`Server name: ${interaction.guild.name}\nTotalMembers: ${interaction.guild.memberCount}`);
    }
  },
};