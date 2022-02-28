import React from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Outstanding from "../components/Outstanding";
import Slider from "../components/Slider";

const Home = () => {


  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div>
        <Slider />
      </div>
      <Outstanding />
      <Footer />
    </div>
  );
};

export default Home;
