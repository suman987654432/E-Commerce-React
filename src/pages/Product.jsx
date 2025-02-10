import { useNavigate } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import { useState, useEffect } from 'react';
import "../css/Product.css";
import { useDispatch } from 'react-redux';
import { addtoCart } from '../cartSlice';


const Product = () => {
  const [mydata, setMydata] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loadData = async () => {
    try {
      const api = "http://localhost:3000/smartphones";
      const response = await axios.get(api);
      setMydata(response.data);
      setFilteredData(response.data);
      const uniqueCategories = ["All", ...new Set(response.data.map((product) => product.category))];
      setCategories(uniqueCategories);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setFilteredData(category === "All" ? mydata : mydata.filter((product) => product.category === category));
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
        {filteredData.map((product) => (
          <Card key={product.id} className="product-card" onClick={() => navigate(`/product/${product.id}`, { state: product })}>
            <div className="image-container">
              <Card.Img variant="top" src={product.image} className="product-image" alt={product.name} />
            </div>
            <Card.Body>
              <Card.Title className="product-name">{product.name}</Card.Title>
              <Card.Text className="product-description">{product.description}</Card.Text>
              <Card.Text className="product-price">${product.price}</Card.Text>
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
                <span className="truncate" >Buy Now</span>
              </button>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Product;
