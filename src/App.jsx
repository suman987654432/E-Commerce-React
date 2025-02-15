import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import Home from "./pages/Home";
import Product from "./pages/Product";
import CartPage from "./pages/CartPage";
import Checkout from "./pages/Checkout";
import DetailPage from "./pages/DetailPage";
import WishlistPage from "./pages/WishlistPage";
import Confirm from "./pages/Confirm";
import Search from "./components/Search";
import SignUp from "./components/SignUp";
import Login from "./components/LogIn";
import ProfilePage from "./pages/ProfilePage";
import AdminPage from "./pages/AdminPage";
import Insert from "./pages/Insert";
import Display from "./pages/Display";
import AdminSearch from "./pages/Search"; // Renamed to avoid conflict
import UsePage from "./pages/UsePage";
import OrderedPgae from "./pages/OrderedPgae";
import Footer from "./components/Footer";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Main Layout */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="product" element={<Product />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="product/:id" element={<DetailPage />} />
          <Route path="wishlist" element={<WishlistPage />} />
          <Route path="confirm" element={<Confirm />} />
          <Route path="search" element={<Search />} />
          <Route path="registration" element={<SignUp />} />
          <Route path="login" element={<Login />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="footer" element={<Footer />} />
        </Route>

        {/* Admin Routes */}
        <Route path="admin" element={<AdminPage />}>
          <Route path="insert" element={<Insert />} />
          <Route path="display" element={<Display />} />
          <Route path="search" element={<AdminSearch />} />
          <Route path="user" element={<UsePage />} />
          <Route path="order" element={<OrderedPgae />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;