import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import productRoute from './Routes/Products.routes.js'

dotenv.config()
const app = express()
const PORT = process.env.PORT

app.use(express.json())
app.use(cors())

const Connection = async () => {
  try {
    await mongoose.connect(process.env.MONGOURI)
    console.log("✅ MongoDb connected successfully")

    app.listen(PORT, () => {
    console.log(`✅ Server is running at http://localhost:${PORT}`);
    })
  } catch (err) {
    console.log("❌ MongoDB connection error", err)
  }
}

Connection()

app.use('/api', productRoute)

