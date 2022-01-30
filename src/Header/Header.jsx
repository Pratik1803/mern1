import React from "react";
import Styles from "./Header.module.scss";
import { Stack } from "@mui/material";
import { Link } from "react-router-dom";

function Header({ userLoggedIn, setUserLoggedIn }) {
  return (
    <header className={Styles.header}>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <h1 className={Styles.logo}>M</h1>
        <nav>
          <ul>
            <li>
              <Link to="/mern1">
                <p>Home</p>
              </Link>
            </li>
            <li>
              <Link to="/mern1/about-me">
                <p>About Me</p>
              </Link>
            </li>
            <li>
              <Link to="/mern1/contact">
                <p>Contact</p>
              </Link>
            </li>
            {userLoggedIn ? (
              <li
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setUserLoggedIn(false);
                }}
              >
                <p>Log Out</p>
              </li>
            ) : (
              <>
                <li>
                  <Link to="/mern1/sign-in">
                    <p>Sign-in</p>
                  </Link>
                </li>
                <li>
                  <Link to="/mern1/sign-up">
                    <p>Register</p>
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </Stack>
    </header>
  );
}

export default Header;
