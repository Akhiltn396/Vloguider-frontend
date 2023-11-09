import React, { useEffect, useState } from "react";
import { imageData } from "../../imageData";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import "./Slider.scss"

const Slider = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
      const interval = setInterval(
        () =>
          setCurrentSlide((prev) => (prev === imageData.length - 1 ? 0 : prev + 1)),
        4000
      );
      return () => clearInterval(interval);
    }, []);
  return (
    <div className="slider">
      <div className="container">
       {/* TEXT CONTAINER */}
      <div className="text-container">
        <h1 className="text">
          {imageData[currentSlide].label}
        </h1>
        <button className="btn">Check It Now</button>
      </div>
      {/* IMAGE CONTAINER */}
      <div className="image">
        <img
          src={imageData[currentSlide].url}
          alt=""
          fill
          className="object-cover"
        />
      </div>
      </div>
    </div>
  );
};

export default Slider;
