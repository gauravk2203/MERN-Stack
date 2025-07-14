import { useState, useEffect } from "react";
import { api } from "../api/axiosInstance.js";
import { useDebounce } from "../hooks/Debouncing.js";

function Search() {
  const [Searchtext, setSearchtext] = useState("");
  const [productdata, setProductdata] = useState([]);
  const debouncedText = useDebounce(Searchtext, 500);

  useEffect(() => {
    if (debouncedText.trim().length === 0) {
      setProductdata([]);
      return;
    }

    const fetchData = async () => {
      try {
        const response = await api.get("api/product/Search", {
          params: { Searchtext: debouncedText },
        });
        setProductdata(response.data);
      } catch (err) {
        console.error(err);
        setProductdata([]);
      }
    };

    fetchData();
  }, [debouncedText]);

  return (
    <div style={styles.page}>
      <h2 style={styles.title}>🔍 Real-time Product Search</h2>

      <div style={styles.searchBox}>
        <input
          type="search"
          placeholder="Search for a product..."
          value={Searchtext}
          onChange={(e) => setSearchtext(e.target.value)}
          style={styles.input}
        />
      </div>

      <div style={styles.resultsContainer}>
        {debouncedText && productdata.length === 0 ? (
          <p style={styles.noResult}>No results found.</p>
        ) : (
          productdata.map((product) => (
            <div key={product._id} style={styles.card}>
              <h3 style={styles.productName}>{product.name}</h3>
              <p style={styles.text}>Brand: {product.brand}</p>
              <p style={styles.text}>Category: {product.category}</p>
              <p style={styles.description}>{product.description}</p>
              <p style={styles.price}>₹{product.price}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Search;

const styles = {
  page: {
    background: "#121212",
    minHeight: "75vh",
    padding: "60px 20px",
    color: "#F5F5F5",
    borderRadius: "20px",
    fontFamily: "'Inter', sans-serif",
  },
  title: {
    textAlign: "center",
    marginBottom: "30px",
    fontSize: "34px",
    fontWeight: "700",
    color: "#F5F5F5",
  },
  searchBox: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "40px",
  },
  input: {
    padding: "14px 22px",
    width: "60%",
    border: "1px solid rgba(255, 255, 255, 0.08)",
    borderRadius: "12px",
    fontSize: "18px",
    background: "#1E1E1E",
    color: "#F5F5F5",
    outline: "none",
    transition: "all 0.3s ease",
  },
  resultsContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "24px",
    padding: "0 20px",
  },
  card: {
    padding: "24px",
    borderRadius: "16px",
    background: "#1E1E1E",
    boxShadow: "0 6px 18px rgba(0,0,0,0.35)",
    border: "1px solid rgba(255, 255, 255, 0.08)",
    transition: "all 0.3s ease",
  },
  productName: {
    marginBottom: "8px",
    fontSize: "22px",
    color: "#F5F5F5",
    fontWeight: "600",
  },
  text: {
    margin: "4px 0",
    fontSize: "16px",
    color: "#BBBBBB",
  },
  description: {
    margin: "10px 0",
    color: "#A0A0A0",
    fontSize: "14px",
  },
  price: {
    marginTop: "10px",
    color: "#FFC107",
    fontWeight: "700",
    fontSize: "20px",
  },
  noResult: {
    textAlign: "center",
    fontSize: "18px",
    color: "#999",
  },
};
