const uuid = require('uuid')
const path = require('path')
const {Product} = require("../models/models")
const ApiError = require('../error/ApiError')

class ProductController {
    async create(req, res, next) {
        try {
            let {name, price, typeId, composition} = req.body
            const {img} = req.files
            let fileName = uuid.v4() + ".png"
            img.mv(path.resolve(__dirname, '..', 'static', fileName))


            const product = await Product.create({name, price, typeId, img: fileName, composition})

            return res.json(product)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req, res) {
        const {typeId} = req.query
        let products;
        if (!typeId) {
            products = await Product.findAll()
        }
        if (typeId) {
            products = await Product.findAll({where: {typeId}})
        }
        return res.json(products)
    }

    async getOne(req, res) {
        const {id} = req.params
        const device = await Product.findOne(
            {
                where: {id}
            },
        )
        return res.json(device)

    }

}

module.exports = new ProductController()