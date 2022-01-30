import React from "react";
import Styles from "./ErrorPage.module.scss";

function ErrorPage() {
  return (
    <div className={Styles.err_page}>
      <div className={Styles.err_page_wrapper}>
        <h1 style={{ fontSize: "48px" }}>404 Not Found!</h1>
      </div>
    </div>
  );
}

export default ErrorPage;
