"use strict";

const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');

const fileExists = () => {
    return fs.existsSync('/home/hoanghn/Documents/nodejs/bot_discord/services/data.json');
};

const fileIsNull = () => {
    return fs.readFileSync('/home/hoanghn/Documents/nodejs/bot_discord/services/data.json').length === 0;
};

const dataSet = () => {
    if (fileExists()) {
        console.log('File exists!');
        if (!fileIsNull()) {
            let data = fs.readFileSync('/home/hoanghn/Documents/nodejs/bot_discord/services/data.json');
            console.log('File content: ' + data);
            return data;
        }
        console.log('File is empty!' + ` check file is null return: ${fileIsNull()}`);
        return 'File is empty!' + ` check file is null return: ${fileIsNull()}`;
    }
    if (!fileExists()) {
        console.log('File is not exists!');
    }
    return 'File is not exists!';
};

module.exports = {
    data: new SlashCommandBuilder()
        .setName('logdata')
        .setDescription('Log content in data file'),
    async execute(interaction) {
        await interaction.reply('data log: ' + dataSet());
    }
};