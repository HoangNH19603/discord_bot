"use strict";

const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ban')
        .setDescription('ban bỏ mọe')
        .addUserOption(option => option
            .setName('user')
            .setDescription('ban nó')
            .setRequired(true))
        .addStringOption(option => option
            .setName('thì_thầm_anh_nói_nhỏ')
            .setDescription('chui chet cmn di <3'))
            .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
            .setDMPermission(false),
    async execute(interaction) {
        const target = interaction.options.getUser('user');
        const reason = interaction.options.getString('thì_thầm_anh_nói_nhỏ');
        // console.log(target);
        await interaction.reply(`Ora ora ora ora ${target.username} đã bị khóa mõm`);
		await interaction.guild.members.ban(target);
        if (reason) {
            setTimeout(async () => {
                await interaction.followUp(reason);
            }, 500);
            // console.log(reason);
        }
    }
};