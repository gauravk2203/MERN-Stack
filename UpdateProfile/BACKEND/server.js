import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import { connectDB } from "./Config/db.js"
import auth from "./Routes/auth.route.js"


dotenv.config()
const app = express()
const PORT = process.env.PORT


// middlewares 
connectDB()
app.use(cors())
app.use(express.json())

app.use('/api/v1',auth)

app.listen(PORT ,()=>{
    console.log(`server is running at http://localhost:${PORT}`)
})