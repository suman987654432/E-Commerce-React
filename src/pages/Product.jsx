import Card from 'react-bootstrap/Card';
import axios from 'axios';
import { useState, useEffect } from 'react';
import "../css/Product.css"; // Importing the correct CSS file

const Product = () => {
  const [mydata, setMydata] = useState([]);

  const loadData = () => {
    const api = "http://localhost:3000/smartphones";
    axios.get(api).then((res) => {
      setMydata(res.data);
    });
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="product-container">
      <h1 className="title">OUR PRODUCTS</h1>
      <div className="product-grid">
        {mydata.map((item) => (
          <Card key={item._id} className="product-card">
            <div className="image-container">
              <Card.Img variant="top" src={item.image} className="product-image" />
            </div>
            <Card.Body>
              <Card.Title className="product-name">{item.name}</Card.Title>
              <Card.Text className="product-description">{item.description}</Card.Text>
              <Card.Text className="product-price">${item.price}</Card.Text>
            </Card.Body>
            <Card.Body className="card-actions">
              <button
                className="btn cart-btn"
              >
                <span className="truncate" >Add to Bag</span>
              </button>
              <button
                className="btn buy-btn"
              >
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
