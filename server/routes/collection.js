const router = require('express').Router()
const CollectionController = require('../controllers/CollectionController')




router.get('/collections', CollectionController.showList)
router.delete('/collections/:id', CollectionController.deleteCollection)

module.exports = router