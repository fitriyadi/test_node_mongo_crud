const mongoose = require('mongoose');
const aggregatePaginate = require('mongoose-aggregate-paginate-v2');

const ArticleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: 'Title is required',
    },

    description: {
        type: String,
        required: 'Description is required',
    },

    date: {
        type: Date,
        required: 'Date is required',
    },

}, {timestamps: false,
    versionKey: false});

ArticleSchema.plugin(aggregatePaginate);
module.exports = mongoose.model('Article', ArticleSchema);