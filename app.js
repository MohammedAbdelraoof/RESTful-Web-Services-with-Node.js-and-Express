const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const app = express()
const port = process.env.PORT || 3000
const cors = require('cors')

const productRouter = require('./routers/productsRouter')
const categoryRouter = require('./routers/categoryRouter')

const uri = "mongodb+srv://mohammed:0000@cluster0.j3v2rla.mongodb.net/?retryWrites=true&w=majority";
try {
    mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }, () =>
        console.log("connected to db"));
} catch (error) {
    console.log("faild to connect");
}
// Enable Cors for all routes
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())


app.use('/', productRouter)
app.use('/', categoryRouter)
app.get('/', (req, res) => {
    res.send('Welcome Products App')
})
app.listen(port, () => {
    console.log('Running on port ' + port);
})