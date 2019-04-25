const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const subjectSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String
});

const Subject = mongoose.model("Subject", subjectSchema);
module.exports = Subject;