import React, { useState } from "react";
import "./Register.css";
import user_icon from "../assets/person.png";
import email_icon from "../assets/email.png";
import password_icon from "../assets/password.png";

const Register = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const go_home = () => {
    window.location.href = window.location.origin;
  };

  const register = async (e) => {
    e.preventDefault();
    let register_url = window.location.origin + "/djangoapp/register";
    
    const res = await fetch(register_url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "userName": userName,
        "password": password,
        "firstName": firstName,
        "lastName": lastName,
        "email": email,
      }),
    });

    const json = await res.json();
    if (json.status) {
      sessionStorage.setItem('username', json.userName);
      window.location.href = window.location.origin;
    } else if (json.error === "Already Registered") {
      alert("The user with same username is already registered");
      window.location.href = window.location.origin;
    }
  };

  return (
    <div className="register_container" style={{width: "50%", margin: "auto", marginTop: "10%"}}>
      <div className="header">
        <span className="text">SignUp</span>
        <div className="underline"></div>
      </div>
      <form onSubmit={register}>
        <div className="inputs">
          <div className="input">
            <img src={user_icon} className="img_icon" alt='Username'/>
            <input type="text"  placeholder="Username" className="input_field" onChange={(e) => setUserName(e.target.value)}/>
          </div>
          <div className="input">
            <img src={user_icon} className="img_icon" alt='First Name'/>
            <input type="text"  placeholder="First Name" className="input_field" onChange={(e) => setFirstName(e.target.value)}/>
          </div>
          <div className="input">
            <img src={user_icon} className="img_icon" alt='Last Name'/>
            <input type="text"  placeholder="Last Name" className="input_field" onChange={(e) => setLastName(e.target.value)}/>
          </div>
          <div className="input">
            <img src={email_icon} className="img_icon" alt='Email'/>
            <input type="email"  placeholder="Email" className="input_field" onChange={(e) => setEmail(e.target.value)}/>
          </div>
          <div className="input">
            <img src={password_icon} className="img_icon" alt='Password'/>
            <input type="password"  placeholder="Password" className="input_field" onChange={(e) => setPassword(e.target.value)}/>
          </div>
        </div>
        <div className="submit_container">
          <button type="submit" className="submit">Register</button>
          <button type="button" className="submit" onClick={go_home}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default Register;
