const Router = require('express')
const router = new Router()
const basketController = require('../controllers/basketProductController')

router.post('/', basketController.create)
router.post('/remove', basketController.remove)
router.get('/', basketController.getAll)

// router.get('/:id', basketController.getOne)

module.exports = router