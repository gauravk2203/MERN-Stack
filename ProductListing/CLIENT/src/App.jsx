import { useEffect, useState } from 'react';
import axios from "axios";
import './App.css';

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-[#f9fafb] py-12">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-5xl font-bold text-gray-900 mb-12 text-center tracking-tight"> Products</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
          {products.length === 0 ? (
            <p className="text-center text-gray-500 col-span-full">Loading products...</p>
          ) : (
            products.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition duration-300 group"
              >
                <div className="h-52 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.productName}
                    className="h-full w-full object-cover group-hover:scale-110 transition duration-300"
                  />
                </div>
                <div className="p-6 flex flex-col justify-between h-[200px]">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">{item.productName}</h2>
                    <p className="text-gray-500 text-sm line-clamp-3">{item.description}</p>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-2xl font-bold text-indigo-600">₹{item.price}</span>
                    <button className="px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition text-sm">Buy Now</button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
