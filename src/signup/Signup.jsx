import React from "react";
import Styles from "./Signup.module.scss";
import { Button, CircularProgress, Stack } from "@mui/material";
import signup from "../images/signup.png";
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import PersonIcon from "@mui/icons-material/Person";
import HttpsIcon from "@mui/icons-material/Https";
import EmailIcon from "@mui/icons-material/Email";
import CallIcon from "@mui/icons-material/Call";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    username: "",
    email: "",
    contact: "",
    profession: "",
    password: "",
    confirmPassword: "",
  });

  const createUser = async () => {
    setLoading(true);
    await axios({
      url: `/signup`,
      method: "post",
      data: {
        username: user.username,
        email: user.email,
        contact: user.contact,
        profession: user.profession,
        password: user.password,
      },
    })
      .then((result) => {
        alert("User Created!");
        setUser({
          username: "",
          email: "",
          contact: "",
          profession: "",
          password: "",
          confirmPassword: "",
        });
        document.querySelector(".err").innerText = "";
        navigate("/mern1/sign-in");
      })
      .catch((err) => {
        document.querySelector(".err").innerText =
          "Please provide valid credentials or try with other username and email!";
      });
    setLoading(false);
  };

  function submit() {
    if (user.password === user.confirmPassword) {
      createUser();
    } else {
      document.querySelector(".err").innerText = "Passwords don't match!";
    }
  }

  return (
    <div className={Styles.signup}>
      <Stack direction={"row"} justifyContent={"center"} alignItems={"center"}>
        <img className={Styles.signup_img} src={signup} alt="" />
        <div className={Styles.form}>
          <h1>Register</h1>
          <Input
            id="input-with-icon-adornment"
            placeholder="Username"
            type="text"
            value={user.username}
            onChange={(e) => {
              setUser((prev) => ({ ...prev, username: e.target.value }));
            }}
            startAdornment={
              <InputAdornment position="start" style={{ color: "#111" }}>
                <PersonIcon />
              </InputAdornment>
            }
          />
          <br />
          <Input
            id="input-with-icon-adornment"
            placeholder="Your Email"
            type="email"
            value={user.email}
            onChange={(e) => {
              setUser((prev) => ({ ...prev, email: e.target.value }));
            }}
            startAdornment={
              <InputAdornment position="start" style={{ color: "#111" }}>
                <EmailIcon />
              </InputAdornment>
            }
          />
          <br />
          <Input
            id="input-with-icon-adornment"
            placeholder="Contact Number"
            type="tel"
            value={user.contact}
            onChange={(e) => {
              setUser((prev) => ({ ...prev, contact: e.target.value }));
            }}
            startAdornment={
              <InputAdornment position="start" style={{ color: "#111" }}>
                <CallIcon />
              </InputAdornment>
            }
          />
          <br />
          <Input
            id="input-with-icon-adornment"
            placeholder="Your Profession"
            type="text"
            value={user.profession}
            onChange={(e) => {
              setUser((prev) => ({ ...prev, profession: e.target.value }));
            }}
            startAdornment={
              <InputAdornment position="start" style={{ color: "#111" }}>
                <BusinessCenterIcon />
              </InputAdornment>
            }
          />
          <br />
          <Input
            id="input-with-icon-adornment"
            placeholder="Password"
            type="password"
            value={user.password}
            onChange={(e) => {
              setUser((prev) => ({ ...prev, password: e.target.value }));
            }}
            startAdornment={
              <InputAdornment position="start" style={{ color: "#111" }}>
                <HttpsIcon />
              </InputAdornment>
            }
          />
          <br />
          <Input
            id="input-with-icon-adornment"
            placeholder="Confirm Password"
            type="password"
            value={user.confirmPassword}
            onChange={(e) => {
              setUser((prev) => ({ ...prev, confirmPassword: e.target.value }));
            }}
            startAdornment={
              <InputAdornment position="start" style={{ color: "#111" }}>
                <HttpsIcon />
              </InputAdornment>
            }
          />
          <p className="err" style={{ color: "red" }}></p>
          <div className={Styles.bottom_btns}>
            <Button onClick={submit}>
              {loading ? (
                <CircularProgress
                  style={{ color: "#fff", width: "24px", height: "24px" }}
                />
              ) : (
                "Register"
              )}
            </Button>
          </div>
          <p>
            Already have an account? <Link to="/mern1/sign-in">Sign-in</Link>
          </p>
        </div>
      </Stack>
    </div>
  );
}

export default Signup;
