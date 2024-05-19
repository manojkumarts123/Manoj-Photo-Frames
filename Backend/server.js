import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import dotenv from "dotenv"

import user from "./routes/user.js"
import customer from "./routes/customer.js"
import admin from "./routes/admin.js"


dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

app.use("/user", portal)
app.use("/api/v1/customer", customer)
app.use("/api/v1/admin", admin)
app.use("*", (req,res) => res.status(404).json({"error": "URL Not Found"}))

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
