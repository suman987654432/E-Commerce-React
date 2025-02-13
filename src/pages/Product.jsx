import { useNavigate } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import { useState, useEffect } from 'react';
import "../css/Product.css";
import { useDispatch } from 'react-redux';
import { addtoCart } from '../cartSlice';
import { FaStar } from 'react-icons/fa';

const Product = () => {
  const [mydata, setMydata] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [reviews, setReviews] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setFilteredData(category === "All" ? mydata : mydata.filter((product) => product.category === category));
  };
  const loadData = async () => {
    try {
      const api = "https://json-server-deploy-dp5r.onrender.com/smartphones";
      const response = await axios.get(api);
      setMydata(response.data);
      setFilteredData(response.data);
      const uniqueCategories = ["All", ...new Set(response.data.map((product) => product.category))];
      setCategories(uniqueCategories);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchReviews = async (productId) => {
    try {
      const reviewApi = `http://localhost:3000/userreview?productId=${productId}`;
      const response = await axios.get(reviewApi);
      return response.data;
    } catch (error) {
      console.error("Error fetching reviews:", error);
      return [];
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    const fetchAllReviews = async () => {
      const reviewsData = {};
      for (const product of mydata) {
        const productReviews = await fetchReviews(product.id);
        reviewsData[product.id] = productReviews;
      }
      setReviews(reviewsData);
    };

    if (mydata.length > 0) {
      fetchAllReviews();
    }
  }, [mydata]);

  const calculateAverageRating = (productId) => {
    const productReviews = reviews[productId] || [];
    if (productReviews.length === 0) return 0;

    const totalPoints = productReviews.reduce((sum, rev) => sum + parseFloat(rev.points), 0);
    return Math.floor(totalPoints / productReviews.length); // Floored to nearest whole number
  };

  return (
    <div className="product-container">
      <h1 className="title">OUR PRODUCTS</h1>

      <div className="category-filter">
        <select onChange={(e) => handleCategoryChange(e.target.value)} value={selectedCategory}>
          {categories.map((category, index) => (
            <option key={index} value={category}>{category}</option>
          ))}
        </select>
      </div>

      <div className="product-grid">
        {filteredData.map((product) => {
          const averageRating = calculateAverageRating(product.id);

          return (
            <Card key={product.id} className="product-card" onClick={() => navigate(`/product/${product.id}`, { state: product })}>
              <div className="image-container">
                <Card.Img variant="top" src={product.image} className="product-image" alt={product.name} />
              </div>
              <Card.Body>
                <Card.Title className="product-name">{product.name}</Card.Title>
                <Card.Text className="product-description">{product.description}</Card.Text>
                <Card.Text className="product-price">${product.price}</Card.Text>

                <div className="rating">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} style={{ color: i < averageRating ? "gold" : "#ccc" }} />
                  ))}
                </div>
              </Card.Body>

              <Card.Body className="card-actions">
                <button
                  className="btn cart-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    dispatch(addtoCart({ id: product.id, name: product.name, description: product.description, price: product.price, image: product.image, qnty: 1 }));
                  }}>
                  <span className="truncate">Add to Bag</span>
                </button>
                <button className="btn buy-btn" onClick={(e) => e.stopPropagation()}>
                  <span className="truncate">Buy Now</span>
                </button>
              </Card.Body>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Product;
