const mongoose = require('mongoose')
const { Schema } = mongoose

const categoryModel = new mongoose.Schema({
    name: { type: String },
    id: { type: String }
})

module.exports = mongoose.model('Categories', categoryModel)