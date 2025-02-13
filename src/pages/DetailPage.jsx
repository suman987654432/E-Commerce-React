import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { addtoCart } from '../cartSlice';
import { addToWishlist, removeFromWishlist } from '../WishListSlice';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { IoCart } from "react-icons/io5";
import { FaHeart, FaRegHeart, FaStar } from "react-icons/fa";

const DetailPage = () => {
    const { state: product } = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const wishlistItems = useSelector((state) => state.wishlist.items);
    const isWishlisted = wishlistItems.some((item) => item.id === product?.id);
    const [reviews, setReviews] = useState([]);
    const [show, setShow] = useState(false);
    const [review, setReview] = useState({ email: '', stars: 0, points: '', detail: '' });

    if (!product) return <h2 style={{ textAlign: "center", marginTop: "50px" }}>Product not found</h2>;
    useEffect(() => {
        fetch(`http://localhost:3000/userreview?productId=${product.id}`)
            .then((res) => res.json())
            .then((data) => {
                setReviews(data);
            })
            .catch((err) => console.error(err));
    }, [product.id]);

    const handleStarClick = (rating) => {
        setReview((prev) => ({ ...prev, stars: rating }));
    };

    const handleSubmit = async () => {
        const response = await fetch('http://localhost:3000/userreview', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...review, productId: product.id })
        });
        if (response.ok) {
            alert('Review submitted successfully');
            setShow(false);
            setReview({ email: '', stars: 0, points: '', detail: '' });
        }
    };
    return (
        <div style={styles.container}>
            <Card style={styles.card}>
                <div style={styles.content}>
                    <div style={styles.imageContainer}>
                        <Card.Img
                            variant="top"
                            src={product.image}
                            style={styles.image}
                            alt={product.name}
                        />
                    </div>
                    <Card.Body style={styles.info}>
                        <Card.Title style={styles.name}>{product.name}</Card.Title>
                        <Card.Text style={styles.description}>{product.description}</Card.Text>
                        <Card.Text style={styles.price}>Price: ${product.price}</Card.Text>
                        <div style={styles.buttonGroup}>
                            <button
                                style={styles.cartButton}
                                onClick={() => dispatch(addtoCart({ ...product, qnty: 1 }))}
                            >
                                <IoCart /> Add Cart
                            </button>
                            <button
                                style={styles.buyButton}
                                onClick={() => navigate("/checkout", { state: product })}
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
                            <button onClick={() => setShow(true)}>Add Review</button>
                        </div>
                    </Card.Body>
                </div>
            </Card>

            {/* Review Modal */}
            <Modal show={show} onHide={() => setShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title style={styles.modalTitle}>Add Review</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                value={review.email}
                                onChange={(e) =>
                                    setReview({ ...review, email: e.target.value })
                                }
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Stars</Form.Label>
                            <div>
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <FaStar
                                        key={star}
                                        style={{
                                            cursor: "pointer",
                                            color: star <= review.stars ? "gold" : "gray",
                                            fontSize: "24px",
                                            marginRight: "5px",
                                        }}
                                        onClick={() => handleStarClick(star)}
                                    />
                                ))}
                            </div>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Review Points</Form.Label>
                            <Form.Control
                                type="text"
                                value={review.points}
                                onChange={(e) =>
                                    setReview({ ...review, points: e.target.value })
                                }
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Details</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                value={review.detail}
                                onChange={(e) =>
                                    setReview({ ...review, detail: e.target.value })
                                }
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShow(false)}>
                        Close
                    </Button>
                    <Button
                        variant="primary"
                        onClick={handleSubmit}
                        style={styles.submitReviewButton}
                    >
                        Submit Review
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Reviews Section */}
            <div style={styles.reviewSection}>
                <h3 style={styles.reviewSectionTitle}>Reviews</h3>
                {reviews.map((rev) => (
                    <div key={rev.id} style={styles.reviewCard}>
                        <p><strong>Email:</strong> {rev.email}</p>
                        <p>
                            <strong>Stars:</strong>{" "}
                            {[...Array(rev.stars)].map((_, i) => (
                                <FaStar key={i} style={{ color: "gold" }} />
                            ))}
                        </p>
                        <p><strong>Points:</strong> {rev.points}</p>
                        <p><strong>Detail:</strong> {rev.detail}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "#f8f9fa",
        padding: "20px",
    },
    card: {
        width: "1200px",
        boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.2)",
        borderRadius: "12px",
        backgroundColor: "white",
        overflow: "hidden",
        padding: "20px",
        marginBottom: "40px",
    },
    content: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
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
        padding: "10px 35px",
        fontSize: "16px",
        fontWeight: "bold",
        borderRadius: "8px",
        border: "none",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        gap: "8px",
        transition: "0.7s",
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
    submitReviewButton: {
        backgroundColor: "#007bff",
        border: "none",
    },
    modalTitle: {
        fontSize: "24px",
        fontWeight: "bold",
        color: "#333",
    },
    reviewSection: {
        width: "1200px",
        backgroundColor: "#fff",
        padding: "20px",
        borderRadius: "8px",
        boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)",
    },
    reviewSectionTitle: {
        fontSize: "24px",
        fontWeight: "bold",
        marginBottom: "20px",
        color: "#333",
    },
    reviewCard: {
        borderBottom: "1px solid #ddd",
        padding: "10px 0",
        marginBottom: "10px",
    },
};

export default DetailPage;








