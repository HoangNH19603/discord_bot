require('./models/media');
const fs = require('fs');
const data = require('./data.json');

const addMedia = (media) => {
    fs.writeFile
    ('data.json', media, (err) => {
        if (err) throw err;
        console.log('File saved successfully!');
    });
    fs.readFile('/data.json', (err, data) => {
        if(err) throw err;
        console.log(data);
    });
};