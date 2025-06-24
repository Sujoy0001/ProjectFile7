import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import dotenv from "dotenv"

dotenv.config()

const app = express()
app.use(cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:5173",
    credentials: true
}))
app.use(express.json())
app.use(express.urlencoded())
app.use(express.static("public"))
app.use(cookieParser())

import myWorkRouter from "./routes/myWork.route.js"
import collegeWorkRouter from "./routes/collegeWork.route.js"
import userRouter from "./routes/user.route.js"

app.use("/api/v1/myWork", myWorkRouter)
app.use("/api/v1/collegeWork", collegeWorkRouter)
app.use("/api/v1/user", userRouter)

app.get("/", (_, res) => {
    res.send("working");
})


export { app }