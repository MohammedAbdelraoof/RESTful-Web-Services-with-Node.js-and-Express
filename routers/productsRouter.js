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
            return res.json({ success: true, results: products })
        })
    })
    .post((req, res) => {
        const product = new Product(req.body)
        product.save()
        return res.status(201).json({ success: true, results: product, message: "Product added successfully" })
    })

productRouter.route('/products/:id')
    .get((req, res) => {
        Product.findById(req.params.id, (err, product) => {
            if (err) {
                return res.send({ success: false, message: "No product with this id", err: err })
            }
            return res.json({ success: true, results: product })
        })
    })
    .put((req, res) => {
        Product.findById(req.params.id, (err, product) => {
            if (err) {
                return res.send({ success: false, err: err, message: "faild to update the product" })
            }
            product.name = req.body.name
            product.price = req.body.price
            product.quantity = req.body.quantity
            product.imgURL = req.body.imgURL
            product.categoryID = req.body.categoryID
            product.save()
            return res.json({ success: true, results: product, message: "Product updated successfully" })
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
                return res.send({ success: false, err: err, message: "faild to update the product" });
            }
            return res.json({ success: true, results: product, message: "Product updated successfully" });
        })

    })
    .delete((req, res) => {
        req.product.remove((err) => {
            if (err) {
                return res.send({ success: false, err: err, message: "faild to delete the product" });
            }
            return res.sendStatus(204).json({ success: true, message: "Product deleted successfully" });
        })
    });

module.exports = productRouter;