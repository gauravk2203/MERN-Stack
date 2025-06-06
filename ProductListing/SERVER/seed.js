import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Product } from '../SERVER/Models/product.model.js';

dotenv.config();

const products = [
  {
    "image": "https://images.unsplash.com/photo-1606813907983-9408f954965f",
    "description": "Premium wireless headphones with active noise cancellation.",
    "productName": "Noise Cancelling Headphones",
    "price": "7999"
  },
  {
    "image": "https://images.unsplash.com/photo-1612532422608-77cdad9193c2",
    "description": "Elegant smartwatch with health tracking and notifications.",
    "productName": "Smartwatch Series 5",
    "price": "12499"
  },
  {
    "image": "https://images.unsplash.com/photo-1586075010920-a72e47c714a6",
    "description": "4K Ultra HD Smart TV with HDR and built-in streaming apps.",
    "productName": "Ultra HD Smart TV",
    "price": "39999"
  },
  {
    "image": "https://images.unsplash.com/photo-1571066811608-2ec1147f00d4",
    "description": "High-performance wireless Bluetooth speaker for parties and outdoor events.",
    "productName": "BoomBox 3000",
    "price": "5499"
  },
  {
    "image": "https://images.unsplash.com/photo-1584438784894-89d7a5d0d4c1",
    "description": "Stylish gaming mouse with customizable RGB lighting and 7 programmable buttons.",
    "productName": "HyperX RGB Mouse",
    "price": "2999"
  },
  {
    "image": "https://images.unsplash.com/photo-1602526219100-2896ec2f204d",
    "description": "Compact wireless earbuds with excellent sound quality and a portable charging case.",
    "productName": "AirBuds Pro",
    "price": "6999"
  },
  {
    "image": "https://images.unsplash.com/photo-1526178611241-6b5670fa9f5c",
    "description": "Mechanical gaming keyboard with RGB backlighting and blue switches for tactile feedback.",
    "productName": "MechaKey X200",
    "price": "3999"
  },
  {
    "image": "https://images.unsplash.com/photo-1601048883321-748d9f48f69e",
    "description": "Stylish analog wristwatch with leather strap and water resistance up to 50 meters.",
    "productName": "Classic Leather Watch",
    "price": "2999"
  },
  {
    "image": "https://images.unsplash.com/photo-1576495199013-9282e9f5d2c0",
    "description": "High-capacity 20000mAh power bank with dual USB output and fast charging support.",
    "productName": "VoltBoost 20000",
    "price": "2499"
  },
  {
    "image": "https://images.unsplash.com/photo-1526178274600-1c5f2cf67fa3",
    "description": "Wireless home security camera with night vision, motion detection, and cloud storage.",
    "productName": "SafeCam Pro",
    "price": "7999"
  }
]

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGOURI);
    console.log('✅ Connected to MongoDB');

    // Optional: clear existing products before inserting
    await Product.deleteMany({});
    console.log('🧹 Cleared old products');

    await Product.insertMany(products);
    console.log('🎉 Products inserted successfully');

    mongoose.disconnect();
  } catch (err) {
    console.error('❌ Error seeding DB:', err);
  }
};

seedDB();
