"use strict";

const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('slap')
        .setDescription('vả chết mọe'),
    async execute(interaction) {
        await interaction.reply('${interaction.user.username} vừa vuốt má thân thương ${target.username}');
    }
};