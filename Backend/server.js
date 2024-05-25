import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import dotenv from "dotenv"

import auth from "./routes/authRouter.js"
import customer from "./routes/customerRouter.js"
import admin from "./routes/adminRouter.js"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

// Routes
app.use("/user", auth)
app.use("/api/v1/customer", customer)
app.use("/api/v1/admin", admin)
app.use("*", (req,res) => res.status(404).json({"error": "URL Not Found"}))

// Database Connection
mongoose.connect(process.env.MONGODB_URL)
    .then(() => {
        console.log("MonogoDB Connection Success")
        app.listen(process.env.PORT, () => {
            console.log("APP is listening on port " + PORT)
        })
    })
    .catch((error) => {
        console.log("ERROR")
        console.log(error)
    })

export default app
