import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import "../css/TopMenu.css";
import { IoCart } from "react-icons/io5";
import { useSelector } from "react-redux";
import wish from "../images/wish.png";
import logo from "../images/logo.png"

const TopMenu = () => {
  const CartData = useSelector((state) => state.mycart?.cart || []);
  const cartLength = CartData.length;

  const WishData = useSelector((state) => state.wishlist?.items || []); // Fix selector
  const wishLength = WishData.length;


  return (
    <Navbar bg="dark" variant="dark" expand="lg" style={{ padding: "10px" }}>
      <Container>
        <Navbar.Brand as={Link} to="/" style={{ fontWeight: "bold", fontSize: "1.5rem", color: "Highlight" }}>
          SMARTPHONE 📳 SALE
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto" style={{ fontSize: "1.1rem", gap: "15px" }}>
            <Nav.Link as={Link} to="/home" className="nav-link-custom">Home</Nav.Link>
            <Nav.Link as={Link} to="/search" className="nav-link-custom">Search</Nav.Link>
            <Nav.Link as={Link} to="/product" className="nav-link-custom">Product</Nav.Link>
            <Nav.Link as={Link} to="/registration" className="nav-link-custom">SignUp</Nav.Link>

            {/* Wishlist */}
            <Nav.Link as={Link} to="/wishlist" className="wish-link">
              <div className="icon-container">
                <img src={wish} alt="Wishlist" className="wish-icon" />
                {wishLength > 0 && <span className="wish-count">{wishLength}</span>}
              </div>
            </Nav.Link>

            {/* Cart */}
            <Nav.Link as={Link} to="/cart" className="cart-link">
              <div className="icon-container">
                <IoCart style={{ height: "30px", width: "30px" }} />
                {cartLength > 0 && <span className="cart-count">{cartLength}</span>}
              </div>
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/profile"
              style={{ display: "flex", alignItems: "center", textDecoration: "none", padding: "10px" }}
            >
              <img src={logo} alt="" style={{ width: "30px", height: "30px", borderRadius: "50%" }} />
            </Nav.Link>

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default TopMenu;
