import { useState, useEffect } from "react";
import "../css/display.css"; // Importing CSS
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // Bootstrap JS

const Display = () => {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [updatedProduct, setUpdatedProduct] = useState({
        name: "",
        category: "",
        description: "",
        image: "",
        price: ""
    });

    // Fetch all products
    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await fetch("http://localhost:3000/smartphones");
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    // Handle Delete
    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this product?")) return;

        try {
            await fetch(`http://localhost:3000/smartphones/${id}`, { method: "DELETE" });
            setProducts(products.filter((product) => product.id !== id)); // Remove from UI
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };

    // Handle Edit Click (Opens Modal)
    const handleEditClick = (product) => {
        setSelectedProduct(product);
        setUpdatedProduct(product);
    };

    // Handle Input Change in Modal
    const handleChange = (e) => {
        setUpdatedProduct({ ...updatedProduct, [e.target.name]: e.target.value });
    };

    // Handle Update
    const handleUpdate = async () => {
        try {
            await fetch(`http://localhost:3000/smartphones/${selectedProduct.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedProduct),
            });

            fetchProducts(); // Refresh the table
            alert("Product updated successfully!");
        } catch (error) {
            console.error("Error updating product:", error);
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4">All Products</h2>

            <div className="table-responsive">
                <table className="table table-bordered table-hover">
                    <thead className="table-dark">
                        <tr>
                            <th>ID</th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Description</th>
                            <th>Price (₹)</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product.id}>
                                <td>{product.id}</td>
                                <td><img src={product.image} alt={product.name} className="product-img" /></td>
                                <td>{product.name}</td>
                                <td>{product.category}</td>
                                <td>{product.description}</td>
                                <td>₹{product.price}</td>
                                <td>
                                    <button className="btn btn-primary btn-sm me-2" data-bs-toggle="modal" data-bs-target="#editModal" onClick={() => handleEditClick(product)}>Edit</button>
                                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(product.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Bootstrap Edit Modal */}
            <div className="modal fade" id="editModal" tabIndex="-1" aria-labelledby="editModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="editModalLabel">Edit Product</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label className="form-label">Product Name</label>
                                <input type="text" name="name" className="form-control" value={updatedProduct.name} onChange={handleChange} />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Category</label>
                                <input type="text" name="category" className="form-control" value={updatedProduct.category} onChange={handleChange} />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Description</label>
                                <textarea name="description" className="form-control" rows="3" value={updatedProduct.description} onChange={handleChange}></textarea>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Image URL</label>
                                <input type="text" name="image" className="form-control" value={updatedProduct.image} onChange={handleChange} />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Price</label>
                                <input type="number" name="price" className="form-control" value={updatedProduct.price} onChange={handleChange} />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button type="button" className="btn btn-success" onClick={handleUpdate} data-bs-dismiss="modal">Update</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Display;
