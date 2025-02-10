import { useSelector } from "react-redux";
import { useState } from "react";
import { PiCurrencyInrBold } from "react-icons/pi";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const navigate = useNavigate();
  const Cart = useSelector((state) => state.mycart.cart);
  let totalAmount = 0;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    paymentMethod: "COD",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(""); // Clear error on change
  };

  const handleSubmit = () => {
    const { name, email, address, paymentMethod } = formData;

    if (!name || !email || !address || !paymentMethod) {
      setError("⚠️ Please fill in all required fields.");
      return;
    }

    // Redirect to confirmation page if form is valid
    navigate("/confirm");
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>🛍 Checkout</h2>

      <div style={styles.layout}>
        {/* Order Summary */}
        <Card style={styles.summaryCard}>
          <Card.Body>
            <h4>Order Summary</h4>
            {Cart.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              Cart.map((item) => {
                totalAmount += item.price * item.qnty;
                return (
                  <div key={item.id} style={styles.item}>
                    <img src={item.image} alt={item.name} style={styles.image} />
                    <div>
                      <p style={styles.productName}>{item.name}</p>
                      <p>Qty: {item.qnty}</p>
                      <p>Price: ₹{item.price * item.qnty}</p>
                    </div>
                  </div>
                );
              })
            )}
            <h4 style={styles.total}>
              Total: <PiCurrencyInrBold /> {totalAmount}
            </h4>
          </Card.Body>
        </Card>

        {/* Billing Form */}
        <Card style={styles.formCard}>
          <Card.Body>
            <h4>Billing Details</h4>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter full name"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter email"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  as="textarea"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Enter delivery address"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Payment Method</Form.Label>
                <Form.Select name="paymentMethod" value={formData.paymentMethod} onChange={handleChange}>
                  <option value="COD">Cash on Delivery (COD)</option>
                  <option value="Card">Credit / Debit Card</option>
                </Form.Select>
              </Form.Group>

              {error && <p style={styles.error}>{error}</p>}

              <Button variant="success" style={styles.button} onClick={handleSubmit}>
                Place Order
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </div>
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
    textAlign: "center",
    fontSize: "28px",
    fontWeight: "bold",
    color: "#333",
    marginBottom: "20px",
  },
  layout: {
    display: "grid",
    gridTemplateColumns: "1fr",
    gap: "20px",
  },
  summaryCard: {
    padding: "15px",
    backgroundColor: "#fff",
    borderRadius: "10px",
    boxShadow: "0px 3px 10px rgba(0, 0, 0, 0.1)",
  },
  item: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "10px 0",
    borderBottom: "1px solid #ddd",
  },
  image: {
    width: "100px",
    height: "100px",
    borderRadius: "5px",
    objectFit: "cover",
  },
  productName: {
    fontSize: "16px",
    fontWeight: "bold",
    margin: "0",
  },
  total: {
    fontSize: "20px",
    fontWeight: "bold",
    marginTop: "15px",
  },
  formCard: {
    padding: "15px",
    backgroundColor: "#fff",
    borderRadius: "10px",
    boxShadow: "0px 3px 10px rgba(0, 0, 0, 0.1)",
  },
  button: {
    width: "100%",
    fontSize: "18px",
    fontWeight: "bold",
    padding: "10px",
  },
  error: {
    color: "red",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: "10px",
  },
};

export default Checkout;