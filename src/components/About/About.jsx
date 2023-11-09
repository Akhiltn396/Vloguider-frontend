import React from "react";
import "./About.scss";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const About = () => {
  const { destination } = useSelector((state) => state.search);

  const userItem = localStorage.getItem("user");

  const currentUser =
    localStorage.getItem("user") === "undefined"
      ? null
      : JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    if (currentUser) {
      navigate("/feature");
    } else {
      navigate("/login");
    }
  };
  return (
    <div style={{ marginTop: "150px" }}>
      <div className="" style={{ textAlign: "center" }}>
        <h1>About Vloguider</h1>
        <p>
          The more you travel...The more you begin.With this approach we the
          Vloguider are ready to guide with your destinations.Check our latest
          updates and this will figure out new face of your journey.
        </p>
        <h3>Come Lets Explore</h3>
        <button className="bttn" onClick={handleClick}>
          Get Started
        </button>
      </div>
    </div>
  );
};

export default About;
