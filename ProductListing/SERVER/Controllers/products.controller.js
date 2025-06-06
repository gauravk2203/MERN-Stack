import { Product } from '../Models/product.model.js';

export const getallProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    console.error("❌ Error in getallProducts controller:", err);
    res.status(500).json({
      message: "Failed to fetch products",
      error: err.message
    });
  }
};
