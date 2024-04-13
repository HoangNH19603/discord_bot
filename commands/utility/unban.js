"use strict";

const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('unban')
        .setDescription('thả xích')
        .addUserOption(option => option
            .setName('user')
            .setDescription('đ biết mô tả gì :)')
            .setRequired(true))
        .addStringOption(option => option
            .setName('chửi_nó_trước_khi_thả_xích')
            .setDescription('chui chet cmn di <3'))
            .setDefaultMemberPermissions(PermissionFlagsBits.ban)
            .setDMPermission(false),
    async execute(interaction) {
        const target = interaction.options.getUser('user');
        const reason = interaction.options.getString('chửi_nó_trước_khi_thả_xích');
        // console.log(target);
        await interaction.reply(`Ora ora ora ora ${target.username} thả xích chó <3`);
		await interaction.guild.members.unban(target);
        if (reason) {
            setTimeout(async () => {
                await interaction.followUp(reason);
            }, 500);
            // console.log(reason);
        }
    }
};