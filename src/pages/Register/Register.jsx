import React, { useEffect, useState } from "react";
import "./Register.scss";
import axios from "axios";
import { object, string, number, date, InferType } from "yup";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
// import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import { useDispatch, useSelector } from "react-redux";

import { Link, useNavigate } from "react-router-dom";
const Register = () => {
  const [credentials, setCredentials] = useState([
    {
      username: undefined,
      email: undefined,
      phone: undefined,
      state: undefined,

      password: undefined,
    },
  ]);

  const navigate = useNavigate();
  const handleChange = (e) => {
    setCredentials((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const registerSchema = yup.object().shape({
    username: yup.string().min(4).max(12).required("Please enter fullname"),
    email: yup.string().email().required("Please enter email"),
    phone: yup.string().min(4).max(12).required("Please enter phone number"),
    state: yup.string().required("Please enter state"),

    password: yup.string().min(4).max(12).required("Please enter password"),
  });

  const submitForm = (values) => {
    console.log(values);
  };
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const handlePost = async () => {
    try {
      const { username, email, phone, state, password } = credentials;

      const res = await axios
        .post("http://localhost:3001/api/auth/register", {
          username,
          email,
          phone,
          state,
          password,
        })
        .then(function (response) {
          console.log(response);

          navigate("/login");
        })
        .catch(function (error) {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    // <Formik
    //   initialValues={credentials}
    //   validationSchema={registerSchema}
    //   onSubmit={submitForm}
    // >
    <div className="Register">
      <form onSubmit={handleSubmit((d) => console.log(d))}>
        <div className="container">
          <div className="image">
            <img
              src="https://images.pexels.com/photos/3296434/pexels-photo-3296434.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="login form"
              className="img"
            />
          </div>
          <div className="info">
            <h1 style={{ color: "yellow" }}>Vloguider</h1>

            <h5 style={{ letterSpacing: "1px", width: "200px" }}>
              Signup into your account
            </h5>
            <label>Username</label>

            <br />
            <input
              {...register("username")}
              onChange={handleChange}
              type="text"
              placeholder="Enter your name"
              className="texts"
              id="username"
            />
            <p className="error-text">{errors.username?.message}</p>

            <br />
            <label>Email</label>
            <br />
            <input
              {...register("email")}
              onChange={handleChange}
              type="text"
              placeholder="Enter your email"
              className="texts"
              id="email"
            />
            <p className="error-text">{errors.email?.message}</p>

            <br />
            <label>Phone</label>
            <br />
            <input
              {...register("phone")}
              onChange={handleChange}
              type="number"
              placeholder="Enter your number"
              className="texts"
              id="phone"
            />
            <p className="error-text">{errors.phone?.message}</p>

            <br />
            <label>State</label>
            <br />
            <input
              {...register("state")}
              onChange={handleChange}
              type="text"
              placeholder="Enter your state"
              className="texts"
              id="state"
            />
            <p className="error-text">{errors.state?.message}</p>

            <br />
            <label>Password</label>
            <br />
            <input
              {...register("password")}
              onChange={handleChange}
              type="text"
              placeholder="Enter your password"
              className="texts"
              id="password"
            />
            <p className="error-text">{errors.password?.message}</p>

            <button onClick={handlePost}>Register</button>
          </div>
        </div>
      </form>
    </div>
    // </Formik>
  );
};

export default Register;
