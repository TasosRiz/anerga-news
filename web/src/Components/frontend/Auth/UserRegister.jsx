// src/Pages/Login.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { loginUser } from "../api/auth";
import './Login-Register.css'
import account from '../../assets/Login/account.svg'
import password from '../../assets/Login/password.svg'
import google from '../../assets/Login/google.svg'
import github from '../../assets/Login/github.svg'

function Register() {
  return (
    <div className="register-container">
      <div className="register form-box register">
        <form action="">
          <h1>Register</h1>
          <div className="register input-box">
            <input type="text" placeholder="Username"  required/>
            <img src={account} alt="" />
          </div>
          <div className="register input-box">
            <input type="password" placeholder="Password"  required/>
            <img src={password} alt="" />
          </div>
          <div className="register forgot-link">
            <a href="#">Forgot Password?</a>
          </div>
          <button type="submit" className="btn register-btn">Register</button>
          <p>or register with social platforms</p>
          <div className="register social-icons">
            <a href="#" className="social-icon"><img src={google} alt="" /></a>
            <a href="#" className="social-icon"><img src={github} alt="" /></a>
          </div>
        </form>
      </div>
    </div>
  );
}


export default Register;
