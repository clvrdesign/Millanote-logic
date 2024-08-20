const mongoose = require('mongoose');
const { Schema } = mongoose;

const noteSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    category:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    }
});

const Note = mongoose.model('Note', noteSchema);

module.exports = Note;
