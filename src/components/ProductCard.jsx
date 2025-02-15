import "../css/ProductCard.css";
import { FaRegHeart, FaStar } from "react-icons/fa";
import img from "../images/pro1.png";
import img2 from "../images/pro2.png";
import img3 from "../images/pro3.png";
import img4 from "../images/pro4.png";
import img5 from "../images/pro5.png";
import img6 from "../images/pro6.png";
import img7 from "../images/pro7.png";
import img8 from "../images/pro8.png";

const ProductCard = () => {

    const products = [
        { id: 1, title: "Laptop Sleeve MacBook", price: "$59.00", description: "Organic Cotton, fairtrade certified", image: img, rating: 5 },
        { id: 2, title: "Wireless Headphones", price: "$89.99", description: "Noise Cancelling, Bluetooth", image: img2, rating: 4},
        { id: 3, title: "Smart Watch", price: "$129.99", description: "Fitness tracking, Heart Rate Monitor", image: img3, rating: 5 },
        { id: 4, title: "Gaming Mouse", price: "$49.99", description: "Ergonomic, RGB Lighting", image: img4, rating: 4 },
        { id: 5, title: "Portable Speaker", price: "$69.99", description: "Waterproof, 360° Sound", image: img5, rating: 5 },
        { id: 6, title: "Mechanical Keyboard", price: "$99.00", description: "RGB Backlit, Blue Switches", image: img6, rating: 5 },
        { id: 7, title: "Wireless Earbuds", price: "$79.00", description: "Active Noise Cancellation", image: img7, rating: 4 },
        { id: 8, title: "4K Webcam", price: "$149.99", description: "HD Streaming, Autofocus", image: img8, rating: 5 }
    ];

    return (
        <div className="product-list">
            {products.map(({ id, title, price, description, image, rating,  }) => (
                <div className="product-card" key={id}>
                    <div className="image-container">
                        <img src={image} alt={title} className="product-image" />
                        <FaRegHeart className="wishlist-icon" />
                    </div>
                    <div className="product-info">
                        <div className="product-title-price">
                            <h3 className="product-title">{title}</h3>
                            <span className="product-price">{price}</span>
                        </div>
                        <p className="product-description">{description}</p>
                        <div className="product-rating">
                            {[...Array(rating)].map((index) => (
                                <FaStar key={index} className="star-icon" />
                            ))}
                           
                        </div>
                        <button className="add-to-cart">Add to Cart</button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ProductCard;
