const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const {User, Basket} = require('../models/models')

class UserController {
    async registration(req, res, next) {
        const {email, password, role} = req.body
        if (!email || !password) {
            return next(ApiError.badRequest('Некорректный email или password'))
        }
        const candidate = await User.findOne({where: {email}})
        if (candidate) {
            return next(ApiError.badRequest('Пользователь с таким email уже существует'))
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const user = await User.create({email, role, password:hashPassword})
        const basket = await Basket.create({userId : user.id})
        const token = `${email} ${user.password}`
        return res.json({id: user.id, role: user.role, email: user.email, token: token, basketId: basket.id, message: "Регистрация аккаунта произошла успешно"})
    }

    async login(req, res, next) {
        const {email, password, id} = req.body
        const  user = await User.findOne({where: {email}})
        if (!user) {
            return next(ApiError.internal('Пользователь не найден'))
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword) {
            return next(ApiError.internal('Указан неверный пароль'))
        }
        const token = `${email} ${user.password}`
        const basket = await Basket.findOne({where: {userId : user.id}})
        return res.json({id: user.id, role: user.role, email: user.email, token: token, basketId: basket.id, message: "Вы успешно вошли в систему"})
    }

    async check(req, res) {
        try {
            const email = req.headers.authorization.split(' ')[0]
            const password = req.headers.authorization.split(' ')[1]

            if (!password) {
                return res.status(401).json({message: 'Пользователь не авторизован (Не указан пароль)'})
            }
            const user = await User.findOne({where: {email}})
            if (!user) {
                return res.status(401).json({message: 'Пользователь не авторизован (Пользователь не найден)'})
            }
            let comparePassword = password === user.password

            if (!comparePassword) {
                return res.status(401).json({message: 'Пользователь не авторизован (Пароли не совпадают)'})
            }
            const token = `${email} ${user.password}`
            const basket = await Basket.findOne({where: {userId : user.id}})
            return res.json({id: user.id, role: user.role, email: user.email, token: token, basketId: basket.id, message: "Пользователь авторизован"})
        } catch (e) {
            res.status(401).json({message: 'Пользователь не авторизован (ХЗ)'})
        }
    }
}

module.exports = new UserController()