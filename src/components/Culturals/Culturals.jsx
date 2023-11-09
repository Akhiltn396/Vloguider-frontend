import React from "react";
import "./Culturals.scss";
import { imageCultures, imageData } from "../../imageData";

const Culturals = () => {

  return (
    <div className="culturals">
      <h2 style={{ textAlign: "center" }}>
        Cultural Destinations that never missed
      </h2>
      <div className="container">
        <div>
          <div className="img">
            {imageCultures.map((image) => (

              <img src={image.url} alt="" />
            ))}
          </div>
          <div className="text">
            <h3>Culturals</h3>
          </div>
        </div>
      </div>

      <div className="subscribe">
        <input type="text" placeholder="Enter your email" />
        <button className="subBtn">Subscribe now</button>
      </div>
    </div>
  );
};

export default Culturals;
