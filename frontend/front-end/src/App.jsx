import Product from "./pages/Product";
import Home from "./pages/Home";
import Products1 from "./pages/Products1";
import Products2 from "./pages/Products2";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import { Routes, Route, Link } from "react-router-dom";
import * as React from "react";


const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="Login" element={<Login/>} />
        <Route path="/Register" element={<Register/>} />
        <Route path="/Products1" element={<Products1/>} />
        <Route path="/Products2" element={<Products2/>} />
        <Route path="/Details" element={<Product/>} />
      </Routes>
    </div>
  )
};

export default App;