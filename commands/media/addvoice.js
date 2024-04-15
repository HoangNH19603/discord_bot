"use strict";

const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');
// require('../../services/data.json');

const loadJson = debugMode => {
    const json = fs.readFileSync('/home/hoanghn/Documents/nodejs/bot_discord/services/data.json');
    const data = JSON.parse(json);
    const dataToMap = new Map(Object.entries(data));
    if (debugMode) {
        console.log(`Data type: ${typeof dataToMap}\nData loaded: ${dataToMap}`);
    }
    return dataToMap;
};

const geneRate = collection => {
    let pc = 100;
    let count = 0;
    collection.forEach(element => {
        if (element.rate === null) {
            count++;
        } else {
            pc -= element.rate;
        }
    });
    collection.map(obj => {
        if (obj.rate === null) {
            obj.autorate = (pc / count).toFixed(1);
        }
    });
    console.log(count);
}

const addData = (key, value, collection) => {
    let listValue = [value];
    if (collection.has(key)) {
        listValue = collection.get(key);
        listValue.push(value);
    }
    geneRate(listValue);
    collection.set(key, listValue);
};

const saveFile = data => {
    const obj = Object.fromEntries(data);
    fs.writeFile('/home/hoanghn/Documents/nodejs/bot_discord/services/data.json', JSON.stringify(obj), (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log('File saved successfully!');
        }
    });
};

const fileExists = () => {
    return fs.existsSync('/home/hoanghn/Documents/nodejs/bot_discord/services/data.json');
};

const fileIsNull = () => {
    return fs.readFileSync('/home/hoanghn/Documents/nodejs/bot_discord/services/data.json').length === 0;
};

const fileInit = () => {
    fs.appendFile('/home/hoanghn/Documents/nodejs/bot_discord/services/data.json', '', (err) => {
        if (err) {
            console.log(err);
        }
        console.log('Create file successfully!');
    });
};

const collectionInit = debugMode => {
    if (fileExists()) {
        if (debugMode) {
            console.log('File already exists!');
        }
        // console.log(fileIsNull());
        if (!fileIsNull()) {
            if (debugMode) {
                console.log('File content: ' + fs.readFileSync('/home/hoanghn/Documents/nodejs/bot_discord/services/data.json'));
            }
            return loadJson(debugMode);
        }
        if (debugMode) {
            console.log('File is empty!' + `check file is null return ${fileIsNull()}`);
        }
    }
    if (!fileExists()) {
        console.log('File is not exists, create new file!');
        fileInit();
    }
    return new Map();
};

module.exports = {
    data: new SlashCommandBuilder()
        .setName('addvoice')
        .setDescription('play voice when someone joins the channel')
        .addRoleOption(option => option
            .setName('role')
            .setDescription('which role want to play voice')
            .setRequired(true))
        .addStringOption(option => option
                .setName('source')
                .setDescription('media source')
                .setRequired(true))
        .addStringOption(option => option
            .setName('name')
            .setDescription('media name'))
        .addNumberOption(option => option
            .setName('rate')
            .setDescription('media rate'))
        .addBooleanOption(option => option
            .setName('debug')
            .setDescription('Debug mode')),
    async execute(interaction) {
        let collection = collectionInit(true);
        // let collection = loadJson(true);

        const mediaName = interaction.options.getString('name');
        const mediaSource = interaction.options.getString('source');
        const mediaRate = interaction.options.getNumber('rate');
        const roleId = interaction.options.getRole('role').id;
        const mode = interaction.options.getBoolean('debug');

        const media = {name: mediaName, source: mediaSource, rate: mediaRate, autorate: mediaRate};
    
        // const media = [`${role}`, [{name: mediaName, source: mediaSource, rate: mediaRate}]];

        // collection.set(`${role}`, [{name: mediaName, source: mediaSource, rate: mediaRate}]);

        addData(roleId, media, collection);

        // await interaction.reply(`Ora ora ora ora ${target.username} đã bị khóa mõm`);
		// await interaction.guild.members.ban(target);
        // if (reason) {
        //     setTimeout(async () => {
        //         await interaction.followUp(reason);
        //     }, 500);
        //     // console.log(reason);
        // }

        await interaction.reply(`${mediaName}\n${mediaSource}\n${mediaRate}\n${roleId}`);

        // console.log(`${mediaName}\n${mediaSource}\n${mediaRate}\n${role}`);
        if (mode) {
            console.log(`Collection type: ${typeof collection}\nData: ${collection}`);
        }

        saveFile(collection);
    }
};