
import "../css/Category.css"; 

import cat1 from "../images/cat1.png";
import cat2 from "../images/cat2.png";
import cat3 from "../images/cat3.png";
import cat4 from "../images/cat4.png";
import cat5 from "../images/cat5.png";
import cat6 from "../images/cat6.png";

const Category = () => {
  return (
    <div className="category-container">
      <h2 className="category-title">Shop Our Top Categories</h2>
      <div className="category-grid">
        {[
          { name: "Furniture", image: cat1 },
          { name: "Hand Bag", image: cat2 },
          { name: "Books", image: cat3 },
          { name: "Tech", image: cat4 },
          { name: "Sneakers", image: cat5 },
          { name: "Travel", image: cat6 },
        ].map((category, index) => (
          <div key={index} className="category-item">
            <img src={category.image} alt={category.name} className="category-image" />
            <div className="category-overlay">
              <span className="category-text">{category.name}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
