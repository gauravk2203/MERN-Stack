import { useState, useEffect } from "react";
import { api } from "../../api/axiosInstance";
import { useDebounce } from "../../hooks/Debounce.js";

function Search() {
  const [text, setText] = useState("");
  const [data, setData] = useState([]);
  const debouncedText = useDebounce(text, 500);

  const fetchData = async (query) => {
    if (query.trim().length === 0) return;

    try {
      const response = await api.get("/product/search", {
        params: { text: query },
      });
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  useEffect(() => {
    if (debouncedText.trim().length === 0) return;
    fetchData(debouncedText);
  }, [debouncedText]);

  // 🔍 On button click
  const handleSearchClick = () => {
    fetchData(text);
  };

  return (
    <div style={styles.container}>
      <label htmlFor="search" style={styles.label}>
        <input
          type="search"
          name="search"
          value={text}
          placeholder="Search products..."
          onChange={(e) => setText(e.target.value)}
          style={styles.input}
        />
        <button onClick={handleSearchClick} style={styles.button}>
          Search
        </button>
      </label>

      <div style={styles.grid}>
        {data.length > 0 ? (
          data.map((e) => (
            <div key={e._id} style={styles.card}>
              <h3 style={styles.title}>{e.productName}</h3>
              <p style={styles.description}>{e.description}</p>
              <p style={styles.price}>₹ {e.price}</p>
            </div>
          ))
        ) : (
          <p style={styles.emptyMessage}>
            {text.trim().length > 0 ? "No products found." : ""}
          </p>
        )}
      </div>
    </div>
  );
}

export default Search;

const styles = {
  container: {
    padding: "20px",
    fontFamily: "sans-serif",
    maxWidth: "1200px",
    margin: "0 auto",
  },
  label: {
    display: "flex",
    gap: "12px",
    marginBottom: "20px",
  },
  input: {
    padding: "10px 16px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    width: "100%",
    maxWidth: "400px",
    fontSize: "16px",
    outline: "none",
  },
  button: {
    padding: "10px 20px",
    backgroundColor: "#4CAF50",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    cursor: "pointer",
    transition: "all 0.2s ease",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
    marginTop: "30px",
  },
  card: {
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "12px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
    transition: "all 0.3s ease",
    backgroundColor: "#fff",
  },
  title: {
    margin: "0 0 10px",
    fontSize: "20px",
    color: "#333",
  },
  description: {
    fontSize: "14px",
    color: "#555",
    marginBottom: "10px",
  },
  price: {
    fontSize: "16px",
    fontWeight: "bold",
    color: "#4CAF50",
  },
  emptyMessage: {
    textAlign: "center",
    color: "#777",
    fontSize: "16px",
    gridColumn: "1 / -1",
  },
};
