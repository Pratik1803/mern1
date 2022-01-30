import { Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import Styles from "./Home.module.scss";

function Home({ userLoggedIn, username }) {
  return (
    <div className={Styles.home}>
      <div className={Styles.home_wrapper}>
        {!userLoggedIn ? (
          <>
            <h1 style={{ fontSize: "64px" }}>The MERN Club.</h1>
            <h1>Hey, want your name to be here?</h1>
            <Link to="/mern1/sign-up">
              <Button>Sign In</Button>
            </Link>
          </>
        ) : (
          <>
            <h1>Hey,</h1>
            <h1 style={{ fontSize: "64px" }}>{username}</h1>
            <h1>Welcome to the MERN Club!</h1>
          </>
        )}
      </div>
    </div>
  );
}

export default Home;
