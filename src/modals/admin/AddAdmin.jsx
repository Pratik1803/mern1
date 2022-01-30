import React, { useState } from "react";
import Styles from "./AddAdmin.module.scss";
import { Button, CircularProgress, Stack } from "@mui/material";
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import PersonIcon from "@mui/icons-material/Person";
import HttpsIcon from "@mui/icons-material/Https";
import EmailIcon from "@mui/icons-material/Email";
import axios from "axios";

function AddAdmin({ setOpenCreateAdmin }) {
  const [loading, setLoading] = useState(false);
  const [adminDetails, setAdminDetails] = useState({
    username: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const createAdmin = async () => {
    setLoading(true);
    try {
      if (adminDetails.password === adminDetails.confirm_password) {
        const { username, email, password } = adminDetails;
        const result = await axios({
          method: "post",
          url: "/admin/signup",
          data: { username, email, password },
        });
        alert("Admin Added Successfully");
        setOpenCreateAdmin(false);
        console.log(result);
      } else {
        document.querySelector(".add_admin_err").innerHTML =
          "Passwords do not match!";
      }
    } catch (error) {
      document.querySelector(".add_admin_err").innerHTML =
        "Invalid Details or try with another Email!";
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <div className={Styles.add_admin}>
      <form>
        <h1>Add New Admin</h1>
        <Stack spacing={3}>
          <Input
            id="input-with-icon-adornment"
            placeholder="Username"
            type="text"
            value={adminDetails.username}
            onChange={(e) => {
              setAdminDetails((prev) => ({
                ...prev,
                username: e.target.value,
              }));
            }}
            fullWidth
            startAdornment={
              <InputAdornment position="start" style={{ color: "#111" }}>
                <PersonIcon />
              </InputAdornment>
            }
          />
          <Input
            id="input-with-icon-adornment"
            placeholder="email"
            type="email"
            value={adminDetails.email}
            onChange={(e) => {
              setAdminDetails((prev) => ({
                ...prev,
                email: e.target.value,
              }));
            }}
            fullWidth
            startAdornment={
              <InputAdornment position="start" style={{ color: "#111" }}>
                <EmailIcon />
              </InputAdornment>
            }
          />
          <Input
            id="input-with-icon-adornment"
            placeholder="Password"
            type="password"
            value={adminDetails.password}
            onChange={(e) => {
              setAdminDetails((prev) => ({
                ...prev,
                password: e.target.value,
              }));
            }}
            fullWidth
            startAdornment={
              <InputAdornment position="start" style={{ color: "#111" }}>
                <HttpsIcon />
              </InputAdornment>
            }
          />
          <Input
            id="input-with-icon-adornment"
            placeholder="Confirm Password"
            type="password"
            value={adminDetails.confirm_password}
            onChange={(e) => {
              setAdminDetails((prev) => ({
                ...prev,
                confirm_password: e.target.value,
              }));
            }}
            fullWidth
            startAdornment={
              <InputAdornment position="start" style={{ color: "#111" }}>
                <HttpsIcon />
              </InputAdornment>
            }
          />
        </Stack>
        <p className="add_admin_err" style={{ color: "red" }}></p>
        <div className={Styles.bottom_btns}>
          <Button onClick={createAdmin}>
            {loading ? (
              <CircularProgress
                style={{ color: "#70b8f7", width: "24px", height: "24px" }}
              />
            ) : (
              "Add"
            )}
          </Button>
          <Button
            style={{
              color: "red",
            }}
            onClick={() => {
              setOpenCreateAdmin(false);
            }}
          >
            Close
          </Button>
        </div>
      </form>
    </div>
  );
}

export default AddAdmin;
