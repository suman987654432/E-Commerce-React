import "../css/Bestpro.css";
import ProductCard from "./ProductCard";

const BestProduct = () => {
    const categories = [
        "Gadgets",
        "Fashion",
        "Toys",
        "Education",
        "Beauty",
        "Fitness",
        "Furniture",
        "Sneakers",
    ];

    return (
        <div className="best-product-container">
            <h2 className="title">Todays Best Deals For You!</h2>
            <div className="category-buttons">
                {categories.map((category) => (
                    <button
                        key={category}
                        className="category-btn"
                    >
                        {category}
                    </button>
                ))}
            </div>
            <ProductCard />
        </div>
    );
};

export default BestProduct;