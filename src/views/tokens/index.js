import React, { useState, useEffect } from "react";
import firebase from "../../config/firebase";
import "./index.css";

const Tokens = () => {


   useEffect(() => {
    
    seeTokens();
    
    
  },[])


  const [customer, setCustomer] = useState();
  const [currentToken, setCurrentToken] = useState();
  const [companyName, setCompanyName] = useState();

  
 
  
  
  
  
  
  
  const seeTokens = async () => {
    console.log("hassannnnn====>" )
    const userId = localStorage.getItem("FBuserId");
  await firebase
    .firestore()
    .collection("Customer")
    .where("customerUserId", "==", userId)
    .get()
    .then((res) => {
        const list = [];
        res.forEach((doc) => {
          const cust = doc.data();
          console.log('id of customer', doc.id)
          list.push(cust);
          
        firebase.firestore().collection("Companies")
          .doc(doc.data().id)
          .get()
          .then(res => {
            console.log('aja bhai data',res.data())
            setCurrentToken(res.data().currentToken)

            autoToken(res.data().Total,res.data().time)
            

          })
        });
        setCustomer(list);
        console.log('hassan///')
      })
      .catch((err) => {
        console.log("no such data", err);
      });
    };
    
   
    
    
    const autoToken =  (ttime,total) => {

      console.log("hassan=========////")
      if(ttime && total)
      {
        const interval = setInterval(()=> {
         
        console.log("hassannnnnn")
           },5000)
      
           setTimeout(()=> {
              clearInterval(interval)
             
           },20000)
      }


     }

      let total1 = currentToken+2
      console.log("token haii", currentToken)
    function notifyMe() {
      
      if (Notification.permission !== 'granted')
       Notification.requestPermission();
      else {
       var notification = new Notification("Token Number" + total1, {
        icon: 'https://cdn.iconscout.com/icon/free/png-512/q-characters-character-alphabet-letter-36051.png',
        body: 'Is your turn after 10mins',
       },
       
       );
       
       notification.onclick = function() {
        window.open('http://localhost:3000/tokens');
       };
       
      }
   
     
  }
     

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
              
              {/* <button className="btn btn-warning">Cancel Token</button> */}
              
            </div>
          );
        })}
    </>
  );
};

export default Tokens;
