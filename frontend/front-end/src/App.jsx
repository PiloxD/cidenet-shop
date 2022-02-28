import ProductDetail from "./pages/Productdetail";
import Home from "./pages/Home";
import Products1 from "./pages/Products";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import { Routes, Route, Link } from "react-router-dom";
import * as React from "react";
import { UserContextProvider } from "./context/UserContext";

const App = () => {
  return (
    <UserContextProvider>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Products1" element={<Products1 />} />
          <Route path="/Details" element={<ProductDetail />} />
          <Route path="/Cart" element={<Cart />} />
        </Routes>
      </div>
    </UserContextProvider>
  )
};

export default App;