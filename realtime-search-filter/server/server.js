import express from 'express'
import dotenv from "dotenv"
import { connection } from './Config/DB.js'

const app = express();
dotenv.config()
app.use(express.json())

const PORT = process.env.PORT

connection()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is listening on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to DB", err);
  });
