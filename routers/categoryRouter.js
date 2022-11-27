const express = require('express')
const Category = require('./../models/categoryModel')
const categoryRouter = express.Router()

categoryRouter.route('/categories')
    .get((req, res) => {
        Category.find((err, categories) => {
            if (err) {
                return res.send(err)
            }
            return res.json(categories)
        })
    })
    .post((req, res) => {
        const category = new Category(req.body)
        category.save()
        return res.status(201).json(category)
    })

module.exports = categoryRouter;