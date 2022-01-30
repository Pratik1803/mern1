import { Button, CircularProgress, Stack } from "@mui/material";
import React, { useState } from "react";
import Styles from "./Login.module.scss";
import login from "../images/login.png";
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import PersonIcon from "@mui/icons-material/Person";
import HttpsIcon from "@mui/icons-material/Https";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login({ setUserLoggedIn, setUsername }) {
  let navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const authenticateUser = async (e) => {
    setLoading(true);
    try {
      const result = await axios({
        method: "post",
        url: `/login`,
        data: user,
      });
      document.querySelector(".sign_in_err").innerHTML = "";
      setUserLoggedIn(true);
      alert("Welcome Back!");
      setUsername(user.username);
      navigate(`/mern1`);
      // console.log(result.data);
    } catch (error) {
      // console.log(error);
      document.querySelector(".sign_in_err").innerHTML =
        "Invalid Username or Password!";
    }
    setLoading(false);
  };

  function submit() {
    authenticateUser();
  }

  return (
    <div className={Styles.login}>
      <div className={Styles.login_container}>
        <Stack direction={"row"} alignItems={"center"}>
          <img className={Styles.login_img} src={login} alt="Login Img" />
          <form action="">
            <h1>Sign In</h1>
            <Input
              id="input-with-icon-adornment1"
              placeholder="Username"
              fullWidth
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
              id="input-with-icon-adornment2"
              placeholder="Password"
              type="password"
              autoComplete=""
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
            <p className="sign_in_err" style={{ color: "red" }}></p>
            <div className={Styles.bottom_btns}>
              <Button onClick={submit}>
                {loading ? (
                  <CircularProgress
                    style={{ color: "#fff", width: "24px", height: "24px" }}
                  />
                ) : (
                  "Sign-in"
                )}
              </Button>
            </div>
            <div className={Styles.external_login_links}>
              <Stack
                direction={"row"}
                justifyContent={"space-between"}
                alignItems={"center"}
              >
                <Stack direction={"row"} alignItems={"center"}>
                  <p>Or Sign-in with:</p>
                  <img src="https://img.icons8.com/color/48/000000/google-logo.png" />
                  <img src="https://img.icons8.com/fluency/48/000000/twitter.png" />
                  <img src="https://img.icons8.com/external-justicon-flat-justicon/64/000000/external-facebook-social-media-justicon-flat-justicon.png" />
                </Stack>
                <p>
                  Don't have an account?{" "}
                  <Link to="/mern1/sign-up">Create here</Link>
                </p>
              </Stack>
            </div>
          </form>
        </Stack>
      </div>
    </div>
  );
}

export default Login;
