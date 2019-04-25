const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    _subjectId: mongoose.Types.ObjectId,
    type: { enum: ["Practice task", "Lab task", "Lection"] },
    name: String,
    filePath: string
});

itemSchema.methods.readFile = () => fs.readFile(path.join(__dirname, this.filePath));

const Item = mongoose.model("Item", itemSchema);
module.exports = Item;