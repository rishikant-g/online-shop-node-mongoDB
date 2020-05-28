const getDb = require('../utils/database').getDb;
const mongoDb = require('mongodb');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const productSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    image: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('Product',productSchema);
