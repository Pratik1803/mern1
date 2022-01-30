import { Button, CircularProgress, Stack } from "@mui/material";
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import PersonIcon from "@mui/icons-material/Person";
import HttpsIcon from "@mui/icons-material/Https";
import EmailIcon from "@mui/icons-material/Email";
import React, { useState } from "react";
import Styles from "./UpdateUser.module.scss";
import axios from "axios";

function UpdateUser({ setShowUpdateUser, userDetails, setUserDetails }) {
  const [loading, setLoading] = useState(false);
  // console.log(userDetails);
  const updateUser = async () => {
    setLoading(true);
    try {
      const result = await axios({
        method: "put",
        url: "/user",
        data: userDetails,
      });
      setShowUpdateUser(false);
      // console.log(result);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <div className={Styles.update_user}>
      <form>
        <h1>Update your Info!</h1>
        <Stack spacing={3}>
          <Input
            id="input-with-icon-adornment"
            placeholder="Username"
            type="text"
            value={userDetails.username}
            onChange={(e) => {
              setUserDetails((prev) => ({ ...prev, username: e.target.value }));
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
            fullWidth
            value={userDetails.email}
            onChange={(e) => {
              setUserDetails((prev) => ({ ...prev, email: e.target.value }));
            }}
            startAdornment={
              <InputAdornment position="start" style={{ color: "#111" }}>
                <EmailIcon />
              </InputAdornment>
            }
          />
          <Input
            id="input-with-icon-adornment"
            placeholder="Contact Number"
            type="text"
            fullWidth
            value={userDetails.contact}
            onChange={(e) => {
              setUserDetails((prev) => ({ ...prev, contact: e.target.value }));
            }}
            startAdornment={
              <InputAdornment position="start" style={{ color: "#111" }}>
                <HttpsIcon />
              </InputAdornment>
            }
          />
          <Input
            id="input-with-icon-adornment"
            placeholder="Profession"
            type="text"
            fullWidth
            value={userDetails.profession}
            onChange={(e) => {
              setUserDetails((prev) => ({
                ...prev,
                profession: e.target.value,
              }));
            }}
            startAdornment={
              <InputAdornment position="start" style={{ color: "#111" }}>
                <HttpsIcon />
              </InputAdornment>
            }
          />
        </Stack>
        <div className={Styles.bottom_btns}>
          <Button onClick={updateUser}>
            {loading ? (
              <CircularProgress
                style={{ color: "#70b8f7", width: "24px", height: "24px" }}
              />
            ) : (
              "Update"
            )}
          </Button>
          <Button
            style={{
              color: "red",
            }}
            onClick={() => {
              setShowUpdateUser(false);
            }}
          >
            Close
          </Button>
        </div>
      </form>
    </div>
  );
}

export default UpdateUser;
