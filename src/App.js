import React, { useEffect, useState } from "react";
import Router from "./config/router";
import firebase from "./config/firebase";

function App() {
  useEffect(() => {
    listenAuthentication();
    
  }, []);

  const [isLoggedIn, setLoggedIn] = useState(true);

  const logOut = () => {
    firebase.auth().signOut();
    localStorage.clear();
  };

  const listenAuthentication = () => {
    firebase.auth().onAuthStateChanged(function (user) {
      setLoggedIn(
        user
          ? { email: user.email, uid: user.uid, name: user.displayName }
          : false
      );
    });
  };

  return (
    <div>
      <div
        style={{
          background: "rgb(82, 82, 82)",
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        {isLoggedIn && (
          <button
            onClick={logOut}
            className="btn btn-danger"
            style={{ margin: "20px" }}
          >
            Logout
          </button>
        )}
        {isLoggedIn && <h2 style={{ color: "white" ,margin:'20px' }}>{isLoggedIn.name}</h2>}
      </div>
      <Router isLoggedIn={isLoggedIn} />
    </div>
  );
}

export default App;
