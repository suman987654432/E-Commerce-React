import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const ProfilePage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [user, setUser] = useState(null);
    const [purchases, setPurchases] = useState([]);

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));

        if (!storedUser) {
            alert("Please log in.");
            navigate("/login");
            return;
        }

        setUser(storedUser);

        // ✅ Fetch user's purchased products
        const fetchPurchases = () => {
            fetch(`http://localhost:3000/Orders?userEmail=${storedUser.email}`)
                .then((res) => res.json())
                .then((data) => setPurchases(data))
                .catch((err) => console.error("Error fetching orders:", err));
        };

        fetchPurchases();

        // ✅ Refetch purchases if navigated with a refresh trigger
        if (location.state?.refresh) {
            fetchPurchases();
            navigate("/profile", { replace: true, state: {} });
        }
    }, [navigate, location]);

    // ✅ Logout function
    const handleLogout = () => {
        localStorage.clear();
        navigate("/login");
    };

    return (
        <div className="container mt-5">
            <div className="card shadow-lg p-4">
                <h2 className="card-title text-center mb-4">User Profile</h2>

                {user && (
                    <div className="mb-3">
                        <p><strong>Name:</strong> {user.name}</p>
                        <p><strong>Email:</strong> {user.email}</p>
                    </div>
                )}

                <button className="btn btn-danger mb-4" onClick={handleLogout}>Logout</button>

                <h3 className="mb-3">Purchased Products</h3>
                {purchases.length > 0 ? (
                    <table className="table table-bordered table-hover">
                        <thead className="table-dark">
                            <tr>
                                <th>Image</th>
                                <th>Product Name</th>
                                <th>Price</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {purchases.map((purchase) => (
                                <tr key={purchase.id}>
                                    <td><img src={purchase.image} alt={purchase.name} className="img-thumbnail" width="50" /></td>
                                    <td>{purchase.name}</td>
                                    <td>₹{purchase.price}</td>
                                    <td>
                                        <span className={`badge ${purchase.status === "Completed" ? "bg-success" : "bg-warning"}`}>
                                            {purchase.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p className="text-muted">No purchases yet.</p>
                )}
            </div>
        </div>
    );
};

export default ProfilePage;
