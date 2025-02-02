import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import authRoutes from "./routes/authRoutes.js"
import reportRoutes from "./routes/reportRoutes.js"
import tipRoutes from "./routes/tipRoutes.js"
import commentRoutes from "./routes/commentRoutes.js"
import {connectDB} from "./lib/connect.js"

dotenv.config()

const app = express()
const PORT = process.env.PORT
const MONGO_URI = process.env.MONGO_URI

app.use(express.json({
    limit: '50mb'
  }))

app.use(cookieParser())

app.use("/api/auth", authRoutes)
app.use("/api/reports", reportRoutes)
app.use("/api/tips", tipRoutes)
app.use("/api/comments", commentRoutes)

app.get("/", (req, res)=>{
  res.status(200).send("welcome to digi suraksha !")
})
app.listen(PORT, ()=>{
    console.log(`Server listening on port ${PORT}`)
    connectDB(MONGO_URI)
})
