import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import axios from "axios";
import { getProfile } from "../../../components/Context/Context";
const Login = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const { profile, setProfile } = getProfile();
  const navigate = useNavigate();
  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("profile"));
    if (!token) {
      return;
    } else {
      navigate("/dashboard");
    }
  }, [navigate]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post(
        "https://file-manager-backend-vert.vercel.app/api/login",
        credentials
      );
      if (result.status == "200") {
        console.log(result.data.user);
        setProfile(result.data.user);
        localStorage.setItem("profile", JSON.stringify(result.data.user));
        navigate("/dashboard");
      }
    } catch (error) {
      alert("Login Failed");
      console.log("Login Failed", error);
    }
  };
  return (
    <div className={styles.signin}>
      <div className={styles.form}>
        <div className={styles.heading}>LOGIN</div>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="e-mail">E-Mail</label>
            <input
              onChange={(e) =>
                setCredentials({ ...credentials, email: e.target.value })
              }
              type="email"
              id="e-mail"
              placeholder="Enter you mail"
              required
              value={credentials.email}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              required
              onChange={(e) =>
                setCredentials({ ...credentials, password: e.target.value })
              }
              type="password"
              id="password"
              placeholder="Enter your password"
              value={credentials.password}
            />
          </div>
          <button type="submit">Submit</button>
        </form>
        <p>
          Don't have an account ? <Link to="/signup"> Sign Up </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
