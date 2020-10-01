import React, { useState, useEffect } from "react";
import firebase from "../../config/firebase";
import "./index.css";

const Tokens = () => {
  const [customer, setCustomer] = useState();
  const [companyId, setCompanyId] = useState();
  console.log("comapny ka dtaat", companyId);
  useEffect(() => {
    seeTokens();
  }, []);

  const seeTokens = () => {
    const userId = localStorage.getItem("FBuserId");
    firebase
      .firestore()
      .collection("Customer")
      .where("customerUserId", "==", userId)
      .get()
      .then((res) => {
        const list = [];
        res.forEach((doc) => {
          const cust = doc.data();
          setCompanyId(doc.data().id);
          list.push(cust);
        });
        setCustomer(list);
      })
      .catch((err) => {
        console.log("no such data", err);
      });
  };

  return (
    <>
      <h1 style={{ textAlign: "center", fontSize: "50px", color: "white" }}>
        Your Tokens
      </h1>
      {customer &&
        customer.map((items) => {
          return (
            <div className="customer_list">
              <h3>Name : {items.name}</h3>
              <h3>Token Number : {items.tokenNum}</h3>
              <img src={items.url} />
            </div>
          );
        })}
    </>
  );
};

export default Tokens;
