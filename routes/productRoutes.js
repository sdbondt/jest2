const express = require('express')
const { getProducts, getProduct, createProduct, updateProduct, deleteProduct } = require('../controllers/productController')
const router = express.Router()


router.get('/products', getProducts)
router.get('/products/:id', getProduct)
router.post('/products', createProduct)
router.patch('/products/:id', updateProduct)
router.delete('/products/:id', deleteProduct)

module.exports = router