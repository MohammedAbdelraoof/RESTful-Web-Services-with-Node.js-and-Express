const mongoose = require('mongoose')
const { Schema } = mongoose

const productModel = new mongoose.Schema({
    name: { type: String },
    price: { type: Number },
    quantity: { type: Number },
    imgURL: { type: String },
    categoryID: { type: Number }
})

module.exports = mongoose.model('Product', productModel)