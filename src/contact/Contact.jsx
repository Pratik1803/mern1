import React from "react";
import Styles from "./Contact.module.scss";
import { Button, CircularProgress, Stack, TextField } from "@mui/material";
import { BACKEND_URL } from "../env";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import Alert from "@mui/material/Alert";

function Contact({ username, userLoggedIn }) {
  const [loading, setLoading] = useState(false);
  const [msgSent, setMsgSent] = useState(false);
  const [msgInfo, setMsgInfo] = useState({
    username: "",
    email: "",
    contact: "",
    message: "",
  });

  const getUserDetails = async (username) => {
    setLoading(true);
    try {
      const user = await axios({
        method: "post",
        url: "/user",
        data: { username },
      });
      setMsgInfo((prev) => ({
        ...prev,
        username: user.data.username,
        email: user.data.email,
        contact: user.data.contact,
      }));
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (userLoggedIn) {
      getUserDetails(username);
    }
  }, []);

  const sendMsg = async () => {
    setLoading(true);
    try {
      const result = await axios({
        method: "post",
        url: `/contact`,
        data: msgInfo,
      });
      setMsgSent(true);
      setMsgInfo((prev) => ({ ...prev, message: "" }));
      // console.log(result);
    } catch (error) {
      setMsgSent(false);
      alert("Invalid Details!");
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <div className={Styles.contact}>
      {loading ? (
        <CircularProgress
          style={{
            color: "#70b8f7",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
          }}
        />
      ) : (
        <form action="">
          <h1>Send a Hi!</h1>
          {msgSent ? (
            <>
              <Alert severity="success">
                <strong>Message Sent!</strong>
              </Alert>
              <br />
            </>
          ) : null}
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
            spacing={2}
          >
            <TextField
              value={msgInfo.username}
              onChange={(e) => {
                setMsgInfo((prev) => ({ ...prev, username: e.target.value }));
              }}
              size="small"
              placeholder="Username"
              name="username"
            />
            <TextField
              size="small"
              value={msgInfo.email}
              onChange={(e) => {
                setMsgInfo((prev) => ({ ...prev, email: e.target.value }));
              }}
              placeholder="Email"
              name="email"
            />
            <TextField
              size="small"
              placeholder="Contact No."
              type={"tel"}
              value={msgInfo.contact}
              onChange={(e) => {
                setMsgInfo((prev) => ({ ...prev, contact: e.target.value }));
              }}
              name="number"
            />
          </Stack>
          <br />
          <TextField
            placeholder="Type a message..."
            name="message"
            value={msgInfo.message}
            onChange={(e) => {
              setMsgInfo((prev) => ({ ...prev, message: e.target.value }));
            }}
            multiline
            minRows={6}
            maxRows={6}
            fullWidth
          />
          <div className={Styles.bottom_btns}>
            <Button onClick={sendMsg}>Send Message</Button>
          </div>
        </form>
      )}
    </div>
  );
}

export default Contact;
