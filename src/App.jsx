import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import Home from "./pages/Home";

import Product from "./pages/Product";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Main Layout */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="home" element={<Home />} />

            <Route path="product" element={<Product />} />
          </Route>

        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
