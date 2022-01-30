import React, { useState } from "react";
import Styles from "./Admin_login.module.scss";
// import login from "../images/login.png";
import { Button, CircularProgress, Stack } from "@mui/material";
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import PersonIcon from "@mui/icons-material/Person";
import HttpsIcon from "@mui/icons-material/Https";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Admin_login({ setAdminLogin }) {
  const navigate = useNavigate();
  const [adminInputs, setAdminInputs] = useState({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const adminLogin = async () => {
    setLoading(true);
    try {
      const result = await axios({
        method: "post",
        url: `/admin/login`,
        data: adminInputs,
      });
      if (result.data === true) {
        setAdminLogin(true);
        navigate(`/mern1/admin/home/${adminInputs.username}`);
      }
      console.log(result.data);
    } catch (error) {
      document.querySelector(".admin_signin_err").innerHTML =
        "Invalid username or password!";
      // console.log(error);
    }
    setLoading(false);
  };

  function submit() {
    adminLogin();
  }

  return (
    <div className={Styles.admin_login}>
      <div className={Styles.login_container}>
        <h1>Verify yourself as admin first!</h1>
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          {/* <img className={Styles.login_img} src={""} alt="Login Img" /> */}
          <form>
            <Input
              id="input-with-icon-adornment"
              placeholder="Username"
              fullWidth
              value={adminInputs.username}
              onChange={(e) => {
                setAdminInputs((prev) => ({
                  ...prev,
                  username: e.target.value,
                }));
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
              placeholder="Password"
              type="password"
              value={adminInputs.password}
              onChange={(e) => {
                setAdminInputs((prev) => ({
                  ...prev,
                  password: e.target.value,
                }));
              }}
              startAdornment={
                <InputAdornment position="start" style={{ color: "#111" }}>
                  <HttpsIcon />
                </InputAdornment>
              }
            />
            <p className="admin_signin_err" style={{ color: "red" }}></p>
            <div className={Styles.bottom_btns}>
              <Button onClick={submit}>
                {loading ? (
                  <CircularProgress
                    style={{ color: "#fff", width: "24px", height: "24px" }}
                  />
                ) : (
                  "Verify"
                )}
              </Button>
            </div>
          </form>
        </Stack>
      </div>
    </div>
  );
}

export default Admin_login;
