import express from 'express'

import { tryCatchWrapper } from '../utils.js'
import categoryController from '../controllers/categoryController.js'
import productController from '../controllers/productController.js'

const router = express.Router()

router.route("/").get((req, res) => res.send("Hello Manoj, Common"));

//Category
router.route("/category").get(tryCatchWrapper(categoryController.getAllCategories))

//Product
router.route("/products").get(tryCatchWrapper(productController.getProductList))
router.route("/product/:productId").get(tryCatchWrapper(productController.getProductDetails))

export default router
