import React, { useState, useEffect } from "react";
import firebase from "../../config/firebase";
import "./index.css";

const Tokens = () => {
  const [customer, setCustomer] = useState();
  const [currentToken, setCurrentToken] = useState();
  const [companyName, setCompanyName] = useState();
  const [customerToken, setCustomerToken] = useState();

  
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
          console.log('id of customer', doc.id)
          setCustomerToken(doc.data().tokenNum)
          list.push(cust);

          firebase.firestore().collection("Companies")
          .doc(doc.data().id)
          .get()
          .then(res => {
            console.log('aja bhai data',res.data())
            setCurrentToken(res.data().currentToken)
            setCompanyName(res.data().name)
          })
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
              <img src={items.url} />
              <h3>Name : {items.name}</h3>
              <h3>Your Token Number : {items.tokenNum}</h3>
              <h3>Current Token : {currentToken}</h3>
              <h3>Company : {companyName}</h3>
              <button className="btn btn-warning">Cancel Token</button>
              
            </div>
          );
        })}
    </>
  );
};

export default Tokens;
