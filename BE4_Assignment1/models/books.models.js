const mongoose = require("mongoose")

const BookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    publishedYear: {
        type: Number,
        required: true
    },
    genre: [String],
    language: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    summary: String,
    coverageImageUrl: String,
})

const BookData = mongoose.model('Book', BookSchema)

module.exports = BookData