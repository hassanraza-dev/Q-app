import React, { useState, useEffect } from "react";
import "./index.css";
import firebase from "../../config/firebase";
import { Modal, Button, Form } from "react-bootstrap";
import ModalHeader from "react-bootstrap/esm/ModalHeader";
import { buyToken } from "../../config/firebase";
import { useParams } from "react-router-dom";
import MapComponent from "../../components/Maps";
import { useHistory } from "react-router-dom";

const Customer = (props) => {
  const history = useHistory();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [show, setShow] = useState(false);
  const [search, setSearch] = useState();
  const [comlist, setComList] = useState();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [image, setImage] = useState();
  const [tokenNo, setCurrentToken] = useState(1);
  const [id, setId] = useState();

  const onBuyToken = () => {
    buyToken(name, email, image, id, tokenNo);
  };

  function setCompany() {
    firebase
      .firestore()
      .collection("Companies")
      .where("name", "==", search)
      .get()
      .then((response) => {
        const list = [];
        response.forEach((doc) => {
          const comp = doc.data();
          setCurrentToken(doc.data().currentToken);
          list.push({ ...comp, companiesId: doc.id });
          setId(doc.id);
        });
        setComList(list);

        console.log("listttt***", list);
      });
  }

  return (
    <>
      <Modal show={show} onHide={handleClose} style={{ opacity: "1" }}>
        <ModalHeader>
          <Modal.Title>Add Company</Modal.Title>
        </ModalHeader>

        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Your Name</Form.Label>

              <Form.Control
                type="text"
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Label>Email</Form.Label>

              <Form.Control
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                required
              ></Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Label>Image</Form.Label>

              <Form.Control
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
                required
              ></Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="success" onClick={onBuyToken}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>

      <h1 style={{ color: "white", textAlign: "center", fontSize: "50px" }}>
        Search Company
      </h1>

      <div className="search_box">
        <input
          type="text"
          class="form-control"
          placeholder="Search Company by name"
          onChange={(e) => setSearch(e.target.value)}
        />
        <br />
        <button onClick={setCompany} className="btn btn-warning">
          Search
        </button>
      </div>
      <div
        className="your_token"
        onClick={() => {
          history.push("/tokens");
        }}
      >
        <h1>Your Token</h1>
      </div>
      {comlist &&
        comlist.map((items) => {
          return (
            <div className="container_custom">
              <img src={items.url} />
              <span>Company Name :</span> <h2>{items.name}</h2>
              <span>Address :</span>{" "}
              <h2>
                <button
                  className="btn btn-primary"
                  onClick={() => history.push(`/companylocation/${id}`)}
                >
                  {items.address}
                </button>
              </h2>
              <span>Timing :</span> <h2>{items.timing}</h2>
              <span>Since :</span> <h2>{items.since}</h2>
              <span>Token :</span> <h2>{items.token}</h2>
              {!items.Allow ? (
                <button className="btn btn-warning" disabled>
                  Tokens are Disallow for Today
                </button>
              ) : (
                <button className="btn btn-warning" onClick={handleShow}>
                  Buy Token
                </button>
              )}
            </div>
          );
        })}
    </>
  );
};

export default Customer;
