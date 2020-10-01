import React, { useState } from "react";
import "./index.css";
import { useHistory } from "react-router-dom";

const Home = function () {
  let history = useHistory();
  return (
    <>
      <div
        style={{
          margin: "0 auto",
          width: "280px",
          marginTop: "160px",
          textAlign: "center",
        }}
        onClick={() => history.push("/company")}
      >
        <a href="#" class="btn btn-sm animated-button victoria-two">
          Are you a company?
        </a>
      </div>

      <div
        style={{ margin: "0 auto", width: "280px", textAlign: "center" }}
        onClick={() => history.push("/customer")}
      >
        <a href="#" class="btn btn-sm animated-button victoria-two">
          Are you waiting for tokens?
        </a>
      </div>
    </>
  );
};
export default Home;
