import image from "../images/header.png";
import "../css/Header.css";

export default function Header() {
  return (
    <div className="header-container">
      <div className="header-content">
        <h1 className="header-title">
          Shopping And <br /> Department Store.
        </h1>
        <p className="header-description">
          Shopping is a bit of a relaxing hobby for me, which is sometimes troubling for the bank balance.
        </p>
        <button className="header-button">Learn More</button>
      </div>
      <div className="header-image-container">
        <img src={image} alt="Products Display" className="header-image" />
      </div>
    </div>
  );
}
