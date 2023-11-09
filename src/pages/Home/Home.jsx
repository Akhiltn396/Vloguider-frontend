import React, { useEffect } from "react";
import "./Home.scss";
import Slider from "../../components/Slider/Slider";
import About from "../../components/About/About";
import Trending from "../../components/Trending/Trending";
import Culturals from "../../components/Culturals/Culturals";
import BuyCoffee from "../../components/BuyCoffee/BuyCoffee";
import { useLocation } from "react-router-dom";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

const Home = () => {
  const location = useLocation();
  return (
    <div className="home">
      <div className="container">
        <Slider />
        <About />
        <Trending />
        <Culturals />
        <BuyCoffee />
      </div>
    </div>
  );
};

export default Home;
