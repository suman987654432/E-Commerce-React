import { useSelector, useDispatch } from "react-redux";
import Table from "react-bootstrap/Table";
import { FaPlusCircle, FaMinusCircle } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { PiCurrencyInrBold } from "react-icons/pi";
import { qntyInc, qntyDec, proDelete } from "../cartSlice";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const Cart = useSelector((state) => state.mycart.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let totAmount = 0;

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>🛒 My Cart</h1>
      <hr />
      {Cart.length === 0 ? (
        <p style={styles.emptyMessage}>Your cart is empty.</p>
      ) : (
        <>
          <Table striped bordered hover style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Image</th>
                <th style={styles.th}>Product Name</th>
                <th style={styles.th}>Description</th>
                <th style={styles.th}>Price</th>
                <th style={styles.th}>Quantity</th>
                <th style={styles.th}>Total</th>
                <th style={styles.th}>Action</th>
              </tr>
            </thead>
            <tbody>
              {Cart.map((product) => {
                totAmount += product.price * product.qnty;
                return (
                  <tr key={product.id} style={styles.tr}>
                    <td style={styles.td}>
                      <img src={product.image} alt={product.name} style={styles.image} />
                    </td>
                    <td style={styles.td}>{product.name}</td>
                    <td style={styles.td}>{product.description}</td>
                    <td style={styles.td}>₹{product.price}</td>
                    <td style={styles.td}>
                      <FaMinusCircle
                        style={styles.icon}
                        onClick={() => dispatch(qntyDec({ id: product.id }))}
                      />
                      <span style={styles.quantity}>{product.qnty}</span>
                      <FaPlusCircle
                        style={styles.icon}
                        onClick={() => dispatch(qntyInc({ id: product.id }))}
                      />
                    </td>
                    <td style={styles.td}>₹{product.price * product.qnty}</td>
                    <td style={styles.td}>
                      <MdDelete
                        style={styles.deleteIcon}
                        onClick={() => dispatch(proDelete(product.id))}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
          <div style={styles.footer}>
            <h3 style={styles.totalAmount}>
              <PiCurrencyInrBold /> {totAmount}
            </h3>
            <Button variant="warning" style={styles.checkoutButton} onClick={() => navigate("/checkout")}>
              Proceed to Checkout
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "90%",
    margin: "auto",
    padding: "20px",
    backgroundColor: "#f8f9fa",
    borderRadius: "10px",
    boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)",
  },
  heading: {
    fontSize: "28px",
    fontWeight: "bold",
    textAlign: "center",
    color: "#333",
    marginBottom: "20px",
  },
  emptyMessage: {
    fontSize: "18px",
    color: "#777",
    textAlign: "center",
    padding: "20px",
  },
  table: {
    backgroundColor: "white",
    textAlign: "center",
  },
  th: {
    backgroundColor: "#007bff",
    color: "white",
    padding: "12px",
    fontWeight: "bold",
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
  },
  icon: {
    fontSize: "20px",
    cursor: "pointer",
    margin: "0 8px",
    color: "#007bff",
    transition: "0.3s",
  },
  quantity: {
    fontSize: "16px",
    fontWeight: "bold",
    margin: "0 8px",
  },
  deleteIcon: {
    fontSize: "25px",
    color: "red",
    cursor: "pointer",
    transition: "0.3s",
  },
  footer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "20px",
  },
  totalAmount: {
    fontSize: "22px",
    fontWeight: "bold",
    color: "#333",
  },
  checkoutButton: {
    fontSize: "16px",
    fontWeight: "bold",
    padding: "10px 20px",
  },
};

export default Cart;
