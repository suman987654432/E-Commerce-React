import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Ensure Bootstrap is imported

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);

  // Fetch Orders from JSON Server
  useEffect(() => {
    fetch("http://localhost:3000/Orders") // Update with your deployed JSON Server URL
      .then((res) => res.json())
      .then((data) => setOrders(data))
      .catch((error) => console.error("Error fetching orders:", error));
  }, []);

  // Update Order Status
  const handleStatusChange = (id, newStatus) => {
    fetch(`http://localhost:3000/Orders/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    })
      .then((res) => res.json())
      .then(() => {
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order.id === id ? { ...order, status: newStatus } : order
          )
        );
      })
      .catch((error) => console.error("Error updating order:", error));
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Orders List</h2>
      <div className="table-responsive">
        <table className="table table-bordered table-hover table-striped">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Product Name</th>
              <th>User Email</th>
              <th>Price (₹)</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={order.id}>
                <td>{index + 1}</td>
                <td>
                  <img
                    src={order.image}
                    alt={order.name}
                    className="rounded"
                    style={{ width: "50px", height: "50px" }}
                  />
                </td>
                <td>{order.name}</td>
                <td>{order.userEmail}</td>
                <td>{order.price}</td>
                <td>{order.status}</td>
                <td>
                  <select
                    value={order.status}
                    onChange={(e) => handleStatusChange(order.id, e.target.value)}
                    className="form-select"
                  >
                    <option value="pending">Pending</option>
                    <option value="delivered">Delivered</option>
                    <option value="canceled">Canceled</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrdersPage;
