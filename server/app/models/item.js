const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    _subjectId: mongoose.Schema.Types.ObjectId,
    _userId: mongoose.Schema.Types.ObjectId,
    type: {
        type: String,
        enum: ["Practice task", "Lab task", "Lection", "Completed task"],
        required: true
    },
    fileType: String,
    name: String,
    fileName: String
});

const Item = mongoose.model("Item", itemSchema);
module.exports = Item;