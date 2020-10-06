import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import ModalHeader from "react-bootstrap/esm/ModalHeader";
import { addToken } from "../../config/firebase";
import firebase from "../../config/firebase";
import { useParams } from "react-router-dom";
import "./index.css";
import swal from "sweetalert";

const Detail = () => {
  const date = new Date().getDate();
  let { slug } = useParams();

  const [company, setCompany] = useState("");
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [token, setToken] = useState();
  const [time, setTime] = useState("");
  const [customer, setCustom] = useState();
  let   [currentToken, setCurrentToken] = useState();
  const [customerLength, setCustomerLength] = useState();
  const [isChecked, setIsChecked] = useState(true);
  

  
console.log('customer ki length' ,customerLength)

  // event handler to fire when checkbox checked value changes
  function handleCheckedChange(e) {
    // toggle the isChecked variable false and true
    setIsChecked((prevCheckedValue) => !prevCheckedValue);
    console.log("alowwww========>", isChecked);
    firebase.firestore().collection("Companies").doc(slug).update({
      Allow: isChecked,
    });
  }
 

  useEffect(() => {
    getSingleCompany();
    getCustomer();
  }, []);

  const onAddToken = () => {
    addToken(token, time, slug, date);
    handleClose();
    getSingleCompany();
  };

  const getCustomer = () => {
    firebase
      .firestore()
      .collection("Customer")
      .where("id", "==", slug)
      .get()
      .then((res) => {
        const list = [];
        res.forEach((doc) => {
          const customer = doc.data();
          console.log("customer==========>", doc.data());

          list.push(customer);
        });
        setCustom(list);
        setCustomerLength(list.length);
      });
  };

  console.log("customer==========>", customerLength);

  function getSingleCompany() {
    var docRef = firebase.firestore().collection("Companies").doc(slug);

    docRef
      .get()
      .then(function (doc) {
        if (doc.exists) {
          setCompany(doc.data());
          setCurrentToken(doc.data().currentToken);
          
          
          if (doc.data().regtime) {
            const date = new Date().getDate();

            if (doc.data().regtime !== date) {
              docRef
                .update({
                  token: 0,
                  regtime: 0,
                })
                .then(() => {
                  getSingleCompany();
                });
            } else {
              return;
            }
          } else {
            return;
          }
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      })
      .catch(function (error) {
        console.log("Error getting document:", error);
      });
  }

  if (!company) {
    return <h1 style={{ color: "white" }}>Loading...</h1>;
  }

  const handleClose = () => setShow(false);
  const handleClose1 = () => setShow1(false);
  const handleShow = () => setShow(true);
  const handleShow1 = () => setShow1(true);

  const updateToken = () => {
    
    
     if(currentToken >= customerLength)
     {
      swal("Limit Reached ", "", "info");
     }
     else
     {
      firebase
      .firestore()
      .collection("Companies")
      .doc(slug)
      .update({
        currentToken: currentToken + 1,
      })
      .then(() => {
        getSingleCompany();
        notifyMe()
        
      })
     }
    

    
  };
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

//  useEffect(() => {
//     const timer = setInterval(() => {
//       updateToken()
//       console.log('hahah')
//     }, time*6000);
//                // clearing interval
//     return () => clearInterval(timer);
//   });

  return (
    <>
      <Modal show={show} onHide={handleClose} style={{ opacity: "1" }}>
        <ModalHeader>
          <Modal.Title>Add tokens</Modal.Title>
        </ModalHeader>

        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Number Of tokens</Form.Label>

              <Form.Control
                type="number"
                onChange={(e) => setToken(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Label>Time of each turn (minutes)</Form.Label>

              <Form.Control
                type="number"
                onChange={(e) => setTime(e.target.value)}
                required
              ></Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="success" onClick={onAddToken}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={show1} onHide={handleClose1} style={{ opacity: "1" }}>
        <ModalHeader>
          <Modal.Title></Modal.Title>
        </ModalHeader>

        <Modal.Body>
          {customer &&
            customer.map((items) => {
              return (
                <div style={{ border: "1px solid black" }}>
                  <div>
                    {items.name}
                    {items.email}
                  </div>
                  <div style={{ background: "red" }}>
                    <img
                      src={items.url}
                      style={{ width: "80px", height: "80px" }}
                    />
                  </div>
                </div>
              );
            })}
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose1}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <h1 style={{ textAlign: "center", color: "white", fontSize: "60px" }}>
        Detail
      </h1>

      <div className="detail_box">
        <div style={{ background: "red" }}>
          <img src={company.url} style={{ width: "100%" }} />
        </div>

        <h1>
          Tokens:
          <span style={{ color: "yellowgreen", fontSize: "50px" }}>
            {company.token}

          </span>
        </h1>
        <h1>
          Current Token:
          <span style={{ color: "yellowgreen", fontSize: "50px" }}>
            {currentToken}
          </span>
        </h1>
        <button className="btn btn-warning" onClick={handleShow1}>
          See Customers
        </button>
        <button
          className="btn btn-warning"
          style={{ margin: "5px" }}
          onClick={updateToken}
        >
          Next Patient
        </button>

        <div>
          <div style={{ marginTop: "10px" }} className="detailBox">
            <h2>Name:</h2>
            <h2>{company.name}</h2>
            <h2>Since:</h2>
            <h2>{company.since}</h2>
            <h2>Timing:</h2>
            <h2>{company.timing}</h2>
            <h2>Address:</h2>
            <h2>{company.address}</h2>

            <div>
              {/* set the checked attribute to the value of the isChecked value from state*/}
              <input
                type="checkbox"
                // checked={isChecked}
                onChange={handleCheckedChange}
              />
              <label style={{ color: "wheat", margin: "9px" }}>
                Disallow Today's Token
              </label>
            </div>
          </div>

          <div className="condetail" onClick={handleShow}>
            <h1>Add Tokens</h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default Detail;
