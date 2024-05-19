import express from "express";

const router = express.Router();

router.route("/").get((req, res) => {res.send("Hello Manoj")});

router.route("/login").post();

router.route("/lo").post();

export default router;
