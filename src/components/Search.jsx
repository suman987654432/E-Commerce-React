import { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import axios from "axios";
import { useDispatch } from 'react-redux';
import { addtoCart } from '../cartSlice';
import { useNavigate } from 'react-router-dom';

const Search = () => {
    const [mypro, setMypro] = useState("");
    const [prodata, setProData] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Fetch product data only once
    useEffect(() => {
        const loadData = async () => {
            try {
                const response = await axios.get("http://localhost:3000/smartphones");
                setProData(response.data);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };
        loadData();
    }, []);

    // Filter products based on search input
    const filteredProducts = prodata.filter((key) =>
        key.name.toLowerCase().includes(mypro.toLowerCase())
    );

    return (
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px" }}>
            <h1 style={{ textAlign: "center", color: "#333" }}>Search Product</h1>
            
            <div style={{ textAlign: "center", marginBottom: "20px" }}>
                <label style={{ fontWeight: "bold", fontSize: "16px" }}>Enter Product Name:</label>
                <input
                    type="text"
                    value={mypro}
                    onChange={(e) => setMypro(e.target.value)}
                    style={{
                        marginLeft: "10px",
                        padding: "10px",
                        width: "250px",
                        fontSize: "16px",
                        borderRadius: "8px",
                        border: "1px solid #ccc",
                        outline: "none",
                        transition: "border-color 0.3s",
                    }}
                />
            </div>

            <hr style={{ border: "1px solid #ddd" }} />

            <div style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                gap: "20px",
            }}>
                {filteredProducts.length > 0 ? (
                    filteredProducts.map((key) => (
                        <Card key={key.id} style={{
                            width: '18rem',
                            borderRadius: "10px",
                            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                            transition: "transform 0.3s",
                            cursor: "pointer",
                        }}
                        onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.05)"}
                        onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}>
                            
                            <Card.Img
                                variant="top"
                                src={key.image}
                                style={{
                                    height: "280px",
                                    borderRadius: "10px 10px 0 0",
                                    objectFit: "cover",
                                }}
                                onClick={() => navigate(`/prodetail/${key.id}`)}
                            />
                            <Card.Body style={{ textAlign: "center" }}>
                                <Card.Title style={{ fontSize: "18px", fontWeight: "bold", color: "#222" }}>
                                    {key.name}
                                </Card.Title>
                                <Card.Text style={{ fontSize: "14px", color: "#555" }}>
                                    {key.description}
                                    <h4 style={{ color: "#d9534f", marginTop: "10px" }}>₹{key.price}</h4>
                                </Card.Text>
                                <Button
                                    variant="primary"
                                    style={{
                                        backgroundColor: "#007bff",
                                        border: "none",
                                        padding: "8px 15px",
                                        fontSize: "14px",
                                        borderRadius: "5px",
                                    }}
                                    onClick={() => dispatch(addtoCart({
                                        id: key.id,
                                        name: key.name,
                                        desc: key.description,
                                        price: key.price,
                                        image: key.image,
                                        qnty: 1
                                    }))}
                                >
                                    Add to Cart
                                </Button>
                            </Card.Body>
                        </Card>
                    ))
                ) : (
                    <p style={{ textAlign: "center", fontSize: "18px", color: "#888" }}>No products found.</p>
                )}
            </div>
        </div>
    );
};

export default Search;
