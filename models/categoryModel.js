const mongoose = require('mongoose')
const { Schema } = mongoose

const categoryModel = new mongoose.Schema({
    name: { type: String }
})

module.exports = mongoose.model('Product', categoryModel)