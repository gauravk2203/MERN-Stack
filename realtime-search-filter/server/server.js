import express from 'express'
import dotenv from "dotenv"
import cors from 'cors'
import SearchRoute from './Routes/SearchRoutes.js'
import { connection } from './Config/DB.js'

const app = express();
dotenv.config()
app.use(express.json())
app.use(cors())

const PORT = process.env.PORT

app.use('/api/product' , SearchRoute)

connection()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is listening on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to DB", err);
  });
