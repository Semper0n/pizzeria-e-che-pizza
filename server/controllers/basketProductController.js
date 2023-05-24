const {BasketProduct, Basket, User} = require("../models/models");
const ApiError = require("../error/ApiError");


class BasketProductController {
    async create(req, res) {
        const {productId, size} = req.body
        const email = req.headers.authorization.split(' ')[0]
        const user = await User.findOne({where: {email}})
        const basket = await Basket.findOne({where: {userId : user.id}})
        const [basketProduct, created] = await BasketProduct.findOrCreate({
            where: {productId, basketId: basket.id, size},
            defaults: {productId, basketId: basket.id, size, count: 1}
        })
        if (!created) {
            basketProduct.count += 1
            await basketProduct.save();
            return res.json(basketProduct)
        } else {
            return res.json(basketProduct)
        }
    }

    async remove(req, res, next) {
        const {productId, size} = req.body
        const basketId = req.headers.basket
        const basketProduct = await BasketProduct.findOne({where: {basketId, size, productId}})
        if (basketProduct.count > 1) {
            basketProduct.count -= 1
            await basketProduct.save();
            return res.json(basketProduct)
        } else {
            await basketProduct.destroy();
            return res.json({basketProduct, message: "Элемент успешно удалён"})
        }

    }

    async getAll(req, res, next) {
        const basketId = req.headers.basket
        if (!basketId) {
            return next(ApiError.badRequest('Ошибка входных данных'))
        }
        const basketProducts = await BasketProduct.findAll({where: {basketId}})
        return res.json(basketProducts)
    }

    // async getOne(req, res) {
    //     const {id} = req.params
    //     const basketProduct = await BasketProduct.findOne(
    //         {
    //             where: {id}
    //         },
    //     )
    //     return res.json(basketProduct)
    // }
}

module.exports = new BasketProductController()