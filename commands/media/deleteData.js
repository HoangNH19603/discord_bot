"use strict";

const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');

const clearFile = () => {
    fs.writeFile('/home/hoanghn/Documents/nodejs/bot_discord/services/data.json', '', (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log('Clear data successfully!');
        }
    });
};

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
            console.log('File content: ' + fs.readFileSync('/home/hoanghn/Documents/nodejs/bot_discord/services/data.json'));
            clearFile();
            return;
        }
        console.log('File is empty!' + `check file is null return ${fileIsNull()}`);
    }
    if (!fileExists()) {
        console.log('File is not exists!');
    }
};

module.exports = {
    data: new SlashCommandBuilder()
        .setName('deletevoicedata')
        .setDescription('Delete content in data file'),
    async execute(interaction) {
        await interaction.reply('Delete all content in data file');
        dataSet();
    }
};