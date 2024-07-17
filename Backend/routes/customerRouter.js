import express from "express";

import { tryCatchWrapper } from '../utils.js'
import productController from "../controllers/productController.js"

const router = express.Router();

//Product
router.route("/review/create").post(tryCatchWrapper(productController.createProductReview))

export default router;