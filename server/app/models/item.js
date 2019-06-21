const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    _subjectId: { type: mongoose.Schema.Types.ObjectId, ref: "Subject"},
    _userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    type: {
        type: String,
        enum: ["Practice task", "Lab task", "Lection", "Completed task"],
        required: true
    },
    fileType: String,
    name: String,
    fileName: String,
    originalFileName: String
});

const Item = mongoose.model("Item", itemSchema);
module.exports = Item;