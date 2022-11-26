const express = require('express')
const mongoose = require('mongoose')
const app = express()
const port = process.env.PORT || 3000
const Product = require('./models/productModel')
const Category = require('./models/categoryModel')

const uri = "mongodb+srv://mohammed:0000@productsdb.yyg2crv.mongodb.net/?retryWrites=true&w=majority";
try {
    mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }, () =>
        console.log("connected to db"));
} catch (error) {
    console.log("faild to connect");
}

app.get('/', (req, res) => {
    res.send('Welcome to my nodemon API!')
})
app.listen(port, () => {
    console.log('Running on port ' + port);
})