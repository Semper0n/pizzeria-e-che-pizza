const {User} = require("../models/models");
module.exports = function(role) {
    return async function (req, res, next) {
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
            if (user.role !== role) {
                return res.status(403).json({message: 'Нет доступа'})
            }
            next()
        } catch (e) {
            res.status(401).json({message: 'Пользователь не авторизован'})
        }
    }

}