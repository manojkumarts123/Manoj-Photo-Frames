import express from "express";

import { tryCatchWrapper } from '../utils.js'
import authController from "../controllers/authController.js"

const router = express.Router();

router.route("/").get((req, res) => res.send("Hello Manoj, Auth"));

router.route("/login").post(tryCatchWrapper(authController.userLogin));

router.route("/signup").post(tryCatchWrapper(authController.userSignup));

export default router;
