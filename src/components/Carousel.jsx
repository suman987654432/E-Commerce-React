
import { Carousel } from 'react-bootstrap';
import "../css/Carousel.css"
import carousel1 from "../images/carousel1.jpg";
import carousel2 from "../images/carousel2.jpg";
import carousel3 from "../images/carousel3.jpg";
const CarouselComponent = () => {
  return (
    <Carousel>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={carousel1} 
          alt="First book"
        />
       
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block w-100"
          src={carousel2} // Replace with your book image URL
          alt="Second book"
        />
       
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block w-100"
          src={carousel3}
          alt="Third book"
        />
       
      </Carousel.Item>
    </Carousel>
  );
};

export default CarouselComponent;
