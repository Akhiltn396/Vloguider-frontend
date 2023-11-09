import React from "react";
import "./Navbar.scss";
import Cam from "../../img/camera.png";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { remove } from "../../redux/searchSlice";
import { logOut } from "../../redux/authSlice";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const currentUser =
    localStorage.getItem("user") === undefined
      ? null
      : JSON.parse(localStorage.getItem("user"));
  const handleLogin = () => {
    navigate("/login");
  };

  const handleRegister = () => {
    navigate("/register");
  };
  const handleLogout = async (e) => {
    e.preventDefault();
    dispatch(remove());

    localStorage.setItem("user", null);
    navigate("/");
    dispatch(logOut(currentUser));
  };
  return (
    <div className="navbar">
      <div className="container">
        <div className="img">
          <img src={Cam} alt="" />
        </div>

        <div className="title">
          <h1>Vloguider</h1>
        </div>
        <div className="user">
          {currentUser ? (
            <>
              {currentUser?.isAdmin ? (
                <div>Hey you are an admin</div>
              ) : (
                <div>Hey {currentUser?.username}</div>
              )}
              <button className="button login" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <button className="button login" onClick={handleLogin}>
                Login
              </button>
              <button className="button register" onClick={handleRegister}>
                Register
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
