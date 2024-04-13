"use strict";

const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('slap')
        .setDescription('vả chết mọe')
        .addUserOption(option => option
            .setName('target')
            .setDescription('vả nó')
            .setRequired(true))
        .addStringOption(option => option
            .setName('thì_thầm_anh_nói_nhỏ')
            .setDescription('chui chet cmn di <3'))
        .setDMPermission(true),
    async execute(interaction) {
        const target = interaction.options.getUser('target');
        const badWord = interaction.options.getString('thì_thầm_anh_nói_nhỏ');

        await interaction.reply(`${interaction.user.username} vừa vuốt má thân thương ${target}`);
        if(badWord) {
            setTimeout(async () => {
                await interaction.followUp(`Bụt hiện lệ và nói: \`${badWord}\``);
                // console.log(badWord);
            }, 500);
        }
        // console.log(target);
    }
};