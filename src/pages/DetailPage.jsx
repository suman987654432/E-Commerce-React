import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addtoCart } from '../cartSlice';
import { addToWishlist, removeFromWishlist } from '../WishListSlice';
import Card from 'react-bootstrap/Card';
import { IoCart } from "react-icons/io5";
import { FaHeart, FaRegHeart } from "react-icons/fa";


const DetailPage = () => {
    const { state: product } = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const wishlistItems = useSelector((state) => state.wishlist.items);
    const isWishlisted = wishlistItems.some((item) => item.id === product?.id);

    if (!product) return <h2 style={{ textAlign: "center", marginTop: "50px" }}>Product not found</h2>;

    return (
        <div style={styles.container}>
            <Card style={styles.card}>
                <div style={styles.content}>
                    {/* Left Side - Image */}
                    <div style={styles.imageContainer}>
                        <Card.Img variant="top" src={product.image} style={styles.image} alt={product.name} />
                    </div>

                    {/* Right Side - Details */}
                    <Card.Body style={styles.info}>
                        <Card.Title style={styles.name}>{product.name}</Card.Title>
                        <Card.Text style={styles.description}>{product.description}</Card.Text>
                        <Card.Text style={styles.price}>Price: <span>${product.price}</span></Card.Text>

                        <div style={styles.buttonGroup}>
                            <button style={styles.cartButton} onClick={() => dispatch(addtoCart({ ...product, qnty: 1 }))}>
                                <IoCart /> Add to Cart
                            </button>
                            <button
                                style={styles.buyButton}
                                onClick={() => navigate("/checkout", { state: product})}
                            >
                                Buy Now
                            </button>

                            <button
                                style={isWishlisted ? styles.wishlistButtonActive : styles.wishlistButton}
                                onClick={() =>
                                    isWishlisted
                                        ? dispatch(removeFromWishlist(product.id))
                                        : dispatch(addToWishlist(product))
                                }
                            >
                                {isWishlisted ? <FaHeart /> : <FaRegHeart />} Wishlist
                            </button>
                        </div>
                    </Card.Body>
                </div>
            </Card>
        </div>
    );
};

const styles = {
    container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "90vh",
        backgroundColor: "#f8f9fa",
        padding: "20px",
    },
    card: {
        width: "1200px",
        height: "700px",
        display: "flex",
        flexDirection: "column",
        boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.2)",
        borderRadius: "12px",
        backgroundColor: "white",
        overflow: "hidden",
        padding: "20px",
    },
    content: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        height: "100%",
    },
    imageContainer: {
        flex: "1",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
    },
    image: {
        width: "100%",
        maxWidth: "500px",
        height: "auto",
        borderRadius: "8px",
    },
    info: {
        flex: "1",
        textAlign: "left",
        padding: "30px",
    },
    name: {
        fontSize: "28px",
        fontWeight: "bold",
        color: "#333",
    },
    description: {
        fontSize: "18px",
        color: "#555",
        marginTop: "10px",
    },
    price: {
        fontSize: "22px",
        fontWeight: "bold",
        color: "#28a745",
        marginTop: "15px",
    },
    buttonGroup: {
        display: "flex",
        gap: "15px",
        marginTop: "30px",
    },
    cartButton: {
        backgroundColor: "#007bff",
        color: "white",
        padding: "12px 25px",
        fontSize: "16px",
        fontWeight: "bold",
        borderRadius: "8px",
        border: "none",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        gap: "8px",
        transition: "0.3s",
    },
    buyButton: {
        backgroundColor: "#ff9800",
        color: "white",
        padding: "12px 25px",
        fontSize: "16px",
        fontWeight: "bold",
        borderRadius: "8px",
        border: "none",
        cursor: "pointer",
        transition: "0.3s",
    },
    wishlistButton: {
        backgroundColor: "#dc3545",
        color: "white",
        padding: "12px 25px",
        fontSize: "16px",
        fontWeight: "bold",
        borderRadius: "8px",
        border: "none",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        gap: "8px",
        transition: "0.3s",
    },
    wishlistButtonActive: {
        backgroundColor: "#ff1744",
        color: "white",
        padding: "12px 25px",
        fontSize: "16px",
        fontWeight: "bold",
        borderRadius: "8px",
        border: "none",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        gap: "8px",
        transition: "0.3s",
    },
};

export default DetailPage;
