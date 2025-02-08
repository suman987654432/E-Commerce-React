import Card from 'react-bootstrap/Card';
import axios from 'axios';
import { useState, useEffect } from 'react';
import "../css/Product.css";
import { useDispatch } from 'react-redux';
import { addtoCart } from '../cartSlice';

const Product = () => {
  const [mydata, setMydata] = useState([]);
  const dispatch = useDispatch();

  const loadData = async () => {
    try {
      const api = "http://localhost:3000/smartphones";
      const response = await axios.get(api);
      setMydata(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="product-container">
      <h1 className="title">OUR PRODUCTS</h1>
      <div className="product-grid">
        {mydata.map((key, index) => (
          <Card key={key._id || index} className="product-card">
            <div className="image-container">
              <Card.Img variant="top" src={key.image} className="product-image" alt={key.name} />
            </div>
            <Card.Body>
              <Card.Title className="product-name">{key.name}</Card.Title>
              <Card.Text className="product-description">{key.description}</Card.Text>
              <Card.Text className="product-price">${key.price}</Card.Text>
            </Card.Body>
            <Card.Body className="card-actions">
              <button
                className="btn cart-btn"
                onClick={() => { dispatch(addtoCart({ id: key.id, name: key.name, description: key.description, price: key.price, image: key.image, qnty: 1 }))}}>
              
                <span className="truncate">Add to Bag</span>
              </button>
              <button className="btn buy-btn">
                <span className="truncate">Buy Now</span>
              </button>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Product;
