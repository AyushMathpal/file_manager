import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../Login/Login.module.css";
import axios from "axios"
import { getProfile } from "../../../components/Context/Context";
export default function Signup() {
  const [credentials, setCredentials] = useState({
    username: "",
    email: "",
    password: "",
  });
  const {profile,setProfile}=getProfile()
  const navigate=useNavigate()
  useEffect(() => {
    const token=localStorage.getItem('profile')
    if(!token){
        return
    }
    else{
      navigate("dashboard")
    }
}, [navigate])
  const handleSubmit = async(e) => {
    
    e.preventDefault()
    if(credentials.password.length<8){
      alert("Password must be than 8 characters")
      return;
    }
    console.log(credentials)
	try {
  
		const result = await axios.post("http://localhost:3000/api/signup",credentials);
    if(result.status=="200"){
      setProfile(result.data.userData)
      navigate("/dashboard")
      localStorage.setItem("profile",JSON.stringify(result.data.userData))
    }
	} catch (error) {
    alert(error.response.data.error)
		console.log("SignUp Failed",error)
	}
  };
  return (
    <div className={styles.signin}>
      <div className={styles.form}>
        <div className={styles.heading}>CREATE AN ACCOUNT</div>
        <form onSubmit={handleSubmit}> 
          <div>
            <label htmlFor="username">Name</label>
            <input
            required
              onChange={(e) =>
                setCredentials({ ...credentials, username: e.target.value })
              }
              type="text" 
              id="username"
              placeholder="Enter your username"
              value={credentials.username}
            />
          </div>
          <div>
            <label htmlFor="email">E-Mail</label>
            <input
            required
              onChange={(e) =>
                setCredentials({ ...credentials, email: e.target.value })
              }
              type="text"
              id="email"
              placeholder="Enter your mail"
              value={credentials.email}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
            required
            onChange={(e) => setCredentials({...credentials,password:e.target.value})}
              type="password"
              id="password"
              placeholder="Enter you password"
              value={credentials.password}
            />
          </div>
          <button type="submit"> Submit</button>
          <h2 align="center" className="or">
            OR
          </h2>
        </form>
        <p>
          Have an account ? <Link to="/"> Login </Link>
        </p>
      </div>
    </div>
  );
}
