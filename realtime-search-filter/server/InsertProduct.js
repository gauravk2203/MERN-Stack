import mongoose from "mongoose";
import { Product } from "./Models/ProductModel.js"; 
const products = [
  {
    name: "Noise Cancelling Headphones",
    brand: "Sony",
    category: "Electronics",
    price: 12999,
    description: "Premium over-ear headphones with ANC",
  },
  {
    name: "MacBook Air M2",
    brand: "Apple",
    category: "Laptop",
    price: 99990,
    description: "Ultra-thin, ultra-fast Apple M2 laptop",
  },
  {
    name: "Wireless Mouse",
    brand: "Logitech",
    category: "Accessories",
    price: 999,
    description: "Ergonomic wireless mouse with long battery life",
  },
];


const insertData = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/realtimeSearch", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Connected");

    await Product.insertMany(products);
    console.log("Products inserted successfully");

    process.exit(); 
  } catch (error) {
    console.error("Error inserting products:", error);
    process.exit(1);
  }
};

insertData();
