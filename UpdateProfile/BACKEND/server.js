import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectDB } from "./Config/db.js";
import auth from "./Routes/auth.route.js";

dotenv.config(); 

const app = express();
const PORT = process.env.PORT || 5000; 

// ✅ CORS with credentials
app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true,              
}));

app.use(express.json());
app.use(cookieParser());

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error connecting to database", err);
  });

// ✅ Routes
app.use("/api/v1", auth);
