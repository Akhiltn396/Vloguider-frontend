import React, { useEffect, useState } from "react";
import "./Login.scss";
import axios from "axios";
import { object, string, number, date, InferType } from "yup";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
// import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import { useDispatch, useSelector } from "react-redux";

// import { loginUser } from "../../components/redux/loginUser";
import { Link, useNavigate } from "react-router-dom";
import { loginStart, loginSuccess } from "../../redux/authSlice";

const Login = () => {

  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  });

  const [dataset, setDataset] = useState({});
  const [errorData, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginSchema = yup.object().shape({
    username: yup.string().min(4).max(12).required("Please enter fullname"),
    password: yup.string().min(4).max(12).required("Please enter password"),
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const { user, error, loading, message } = useSelector((state) => state.auth);

  console.log(user)
  const handleChange = (e) => {
    setCredentials((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };
  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      const username = credentials.username;
      const password = credentials.password;
      dispatch(loginStart());
      const res = await axios.post(
        "http://localhost:3001/api/auth/login",
        { username, password },
        {
          withCredentials: true,
        }
      );


      dispatch(loginSuccess({ payload: res?.data?.details }));

      navigate("/");
      // window.location.reload();

    } catch (error) {
      console.log(error);
    }
  };

useEffect(()=>{
  localStorage.setItem("user", JSON.stringify(user?.payload));

},[user?.payload])

  return (
    // <Formik
    //   initialValues={credentials}
    //   validationSchema={registerSchema}
    //   onSubmit={submitForm}
    // >
    <div className="Login">
      <form onSubmit={handleSubmit}>
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
              Signin into your account
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

            <label>Password</label>
            <br />
            <input
              {...register("password")}
              onChange={handleChange}
              type="password"
              placeholder="Enter your password"
              className="texts"
              id="password"
            />
            <p className="error-text">{errors.password?.message}</p>

            <button onClick={handleLogin}>Login</button>
          </div>
        </div>
      </form>
    </div>
    // </Formik>
  );
};

export default Login;
