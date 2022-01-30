import React from "react";
import Styles from "./About.module.scss";
import { Button, CircularProgress, Modal, Stack } from "@mui/material";
import UpdateUser from "../modals/update_user/UpdateUser";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

function About({ userLoggedIn, username }) {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [showUpdateUser, setShowUpdateUser] = useState(false);
  const [userDetails, setUserDetails] = useState({});

  const getUserDetails = async (username) => {
    setLoading(true);
    try {
      const user = await axios({
        method: "post",
        url: "/user",
        data: { username },
      });
      setUserDetails(user.data);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!userLoggedIn) {
      alert("Sign-in first!");
      navigate("/mern1/sign-in");
    } else {
      getUserDetails(username);
    }
  }, []);

  return (
    <>
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
        <div className={Styles.about}>
          <div className={Styles.about_wrapper}>
            <h1>About Me</h1>
            <Stack>
              <Stack direction={"row"} alignItems={"center"}>
                <label htmlFor="name">Username:</label>
                <p>{userDetails.username}</p>
              </Stack>
              <Stack direction={"row"} alignItems={"center"}>
                <label htmlFor="name">Email:</label>
                <p>{userDetails.email}</p>
              </Stack>
              <Stack direction={"row"} alignItems={"center"}>
                <label htmlFor="name">Contact Number:</label>
                <p>{userDetails.contact}</p>
              </Stack>
              <Stack direction={"row"} alignItems={"center"}>
                <label htmlFor="name">Profession:</label>
                <p>{userDetails.profession}</p>
              </Stack>
            </Stack>
            <div className={Styles.bottom_btn}>
              <Button
                onClick={() => {
                  setShowUpdateUser(true);
                }}
              >
                Edit
              </Button>
            </div>
          </div>
          <Modal open={showUpdateUser}>
            {
              <UpdateUser
                setShowUpdateUser={setShowUpdateUser}
                userDetails={userDetails}
                setUserDetails={setUserDetails}
              />
            }
          </Modal>
        </div>
      )}
    </>
  );
}

export default About;
