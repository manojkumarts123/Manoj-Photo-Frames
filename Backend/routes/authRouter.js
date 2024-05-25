import express from "express";
import authController from "../controllers/authController.js"

const router = express.Router();

router.route("/").get((req, res) => {res.send("Hello Manoj")});

router.route("/login").post(authController.userLogin);

router.route("/signup").post(authController.userSignup);

export default router;
