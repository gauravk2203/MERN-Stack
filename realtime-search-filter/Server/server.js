import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import routes from './Routes/SearchRoute.js';
import cors from 'cors';


dotenv.config();

const app = express();
const PORT = 5000; 

app.use(cors())
app.use(express.json());

app.use
app.use('/product', routes);


const startServer = async () => {
    try {
        await mongoose.connect(process.env.MONGODB, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('✅ MongoDB connected successfully');

        app.listen(PORT, () => {
            console.log(`✅ Server is running at http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('❌ Failed to connect to MongoDB', error);
        process.exit(1); 
    }
};

startServer();