import Styles from "./App.module.scss";
import Header from "./Header/Header";
import Login from "./login/Login";
import { Routes, Route } from "react-router-dom";
import Signup from "./signup/Signup";
import Contact from "./contact/Contact";
import Home from "./Home/Home";
import About from "./about/About";
import Admin from "./admin/ad_home/Admin";
import AdminLogin from "./admin/ad_login/Admin_login";
import { useState } from "react";
import ErrorPage from "./404 ErrPage/ErrorPage";

function App() {
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [adminLogin, setAdminLogin] = useState(false);

  return (
    <div className={Styles.app}>
      <Header userLoggedIn={userLoggedIn} setUserLoggedIn={setUserLoggedIn} />
      <Routes>
        <Route
          exact
          path="/mern1"
          element={
            <Home
              username={username}
              setUsername={setUsername}
              userLoggedIn={userLoggedIn}
            />
          }
        ></Route>
        <Route
          exact
          path="/mern1/sign-in"
          element={
            <Login
              setUserLoggedIn={setUserLoggedIn}
              setUsername={setUsername}
            />
          }
        ></Route>
        <Route exact path="/mern1/sign-up" element={<Signup />}></Route>
        <Route
          exact
          path="/mern1/contact"
          element={<Contact username={username} userLoggedIn={userLoggedIn} />}
        ></Route>
        <Route
          exact
          path="/mern1/about-me"
          element={<About userLoggedIn={userLoggedIn} username={username} />}
        ></Route>
        <Route
          exact
          path="/mern1/admin"
          element={<AdminLogin setAdminLogin={setAdminLogin} />}
        ></Route>
        <Route
          exact
          path="/mern1/admin/home/:admin_name"
          element={<Admin adminLogin={adminLogin} />}
        ></Route>
        <Route path="*" element={<ErrorPage />}></Route>
      </Routes>
    </div>
  );
}

export default App;
