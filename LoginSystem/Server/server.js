import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoute from './Routes/authRoute.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT ;


// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/login', authRoute);

app.get('/', (req, res) => {
  res.send('API is running...');
});

// Start the server
app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});
