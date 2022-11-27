const express = require('express')
const Product = require('./../models/productModel')
const productRouter = express.Router()

productRouter.route('/products')
    .get((req, res) => {
        const query = {}
        if (req.query.categoryID) {
            query.categoryID = req.query.categoryID
        }
        Product.find(query, (err, products) => {
            if (err) {
                return res.send(err)
            }
            return res.json(products)
        })
    })
    .post((req, res) => {
        const product = new Product(req.body)
        product.save()
        return res.status(201).json(product)
    })

productRouter.route('/products/:id')
    .get((req, res) => {
        Product.findById(req.params.id, (err, product) => {
            if (err) {
                return res.send(err)
            }
            return res.json(product)
        })
    })
    .put((req, res) => {
        Product.findById(req.params.id, (err, product) => {
            if (err) {
                return res.send(err)
            }
            product.name = req.body.name
            product.price = req.body.price
            product.quantity = req.body.quantity
            product.imgURL = req.body.imgURL
            product.categoryID = req.body.categoryID
            product.save()
            return res.json(product)
        })
    })
    .patch((req, res) => {
        const { product } = req;
        if (req.body._id) {
            delete req.body._id;
        }
        Object.entries(req.body).forEach((item) => {
            const key = item[0];
            const value = item[1];
            product[key] = value;
        })
        req.product.save((err) => {
            if (err) {
                return res.send(err);
            }
            return res.json(product);
        })

    })
    .delete((req, res) => {
        req.product.remove((err) => {
            if (err) {
                return res.send(err);
            }
            return res.sendStatus(204);
        })
    });

module.exports = productRouter;