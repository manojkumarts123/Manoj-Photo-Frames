import express from "express";

import { tryCatchWrapper } from '../utils.js'
import categoryController from "../controllers/categoryController.js"
import productController from '../controllers/productController.js'

const router = express.Router();

router.route("/").get((req, res) => res.send("Hello Manoj Admin"));

//Category
router.route('/category/create').post(tryCatchWrapper(categoryController.createCategory))

//Product
router.route('/product/create').post(tryCatchWrapper(productController.createProduct))


export default router;
