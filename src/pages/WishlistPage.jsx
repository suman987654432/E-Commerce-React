import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { removeFromWishlist } from '../WishListSlice';
import { FaTrash } from "react-icons/fa";

const WishlistPage = () => {
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Hook for navigation

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Your Wishlist ❤️</h1>
      {wishlistItems.length === 0 ? (
        <p style={styles.emptyMessage}>No items in wishlist.</p>
      ) : (
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Image</th>
              <th style={styles.th}>Product Name</th>
              <th style={styles.th}>Price</th>
              <th style={styles.th}>Action</th>
            </tr>
          </thead>
          <tbody>
            {wishlistItems.map((product) => (
              <tr key={product.id} style={styles.tr}>
                <td style={styles.td}>
                  <img
                    src={product.image}
                    alt={product.name}
                    style={styles.image}
                    onClick={() => navigate('/product/:id', { state: product })} // Navigate to Detail Page
                  />
                </td>
                <td
                  style={{ ...styles.td, cursor: "pointer", color: "#007bff" }}
                  onClick={() => navigate('/product/:id', { state: product })} // Navigate when clicking name
                >
                  {product.name}
                </td>
                <td style={styles.td}>${product.price}</td>
                <td style={styles.td}>
                  <button
                    style={styles.removeButton}
                    onClick={() => dispatch(removeFromWishlist(product.id))}
                  >
                    <FaTrash /> Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "900px",
    margin: "auto",
    padding: "20px",
    textAlign: "center",
    backgroundColor: "#f8f9fa",
    borderRadius: "10px",
    boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)",
  },
  heading: {
    fontSize: "28px",
    fontWeight: "bold",
    marginBottom: "20px",
    color: "#333",
  },
  emptyMessage: {
    fontSize: "18px",
    color: "#555",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    backgroundColor: "white",
  },
  th: {
    padding: "12px",
    backgroundColor: "#007bff",
    color: "white",
    fontWeight: "bold",
    borderBottom: "2px solid #ddd",
  },
  tr: {
    borderBottom: "1px solid #ddd",
  },
  td: {
    padding: "12px",
    textAlign: "center",
  },
  image: {
    width: "80px",
    height: "80px",
    borderRadius: "5px",
    objectFit: "cover",
    cursor: "pointer", // Pointer on image for navigation
    transition: "0.3s",
  },
  removeButton: {
    backgroundColor: "#dc3545",
    color: "white",
    border: "none",
    padding: "8px 12px",
    fontSize: "14px",
    fontWeight: "bold",
    borderRadius: "5px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "5px",
    transition: "0.3s",
  },
};

export default WishlistPage;
