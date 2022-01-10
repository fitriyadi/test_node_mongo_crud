const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    comment: {
        type: String,
        required: 'Title is required',
    },

    articleid: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'article'
    },

}, {timestamps: false,
    versionKey: false});

module.exports = mongoose.model('Comment', CommentSchema);