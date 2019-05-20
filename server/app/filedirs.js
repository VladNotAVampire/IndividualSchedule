const fs = require('fs');
const path = require('path');


const uploadsDir = path.join(__dirname, "uploads");
const filesDir = path.join(__dirname, "files");

fs.exists(uploadsDir, exists => {
    if (!exists) fs.mkdir(uploadsDir,
        err => console.error(err))
});
fs.exists(filesDir, exists => {
    if (!exists) fs.mkdir(filesDir,
        err => console.log(err))
});

module.exports = { uploadsDir, filesDir };