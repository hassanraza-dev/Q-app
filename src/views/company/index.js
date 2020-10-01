import React, { useState, useEffect } from "react";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button, Form } from "react-bootstrap";
import ModalHeader from "react-bootstrap/esm/ModalHeader";
import { addCompany } from "../../config/firebase";
import { connect } from "react-redux";
import { setCompany } from "../../store/actions/companyAction";
import firebase from "../../config/firebase";
import { useHistory } from "react-router-dom";
import MapComponent from "../../components/Maps";

const Company = function (props) {
  const userID = props.userId;
  console.log("user Id in company", props.userId);
  const [location, setMap] = useState([]);
  const [lt, setLt] = useState();
  const [ln, setLn] = useState();
  const [limit, setLimit] = useState(6);
  let currentToken = 0;
  let loading = false;

  useEffect(() => {
    setCompany();
    console.log("limit useEffect***", limit);
    document.addEventListener("scroll", trackScrolling);
  }, [userID, limit]);

  useEffect(() => {
    document.addEventListener("scroll", trackScrolling);

    return () => {
      document.removeEventListener("scroll", trackScrolling);
    };
  }, []);

  const getMapData = (data, lt, ln) => {
    console.log("get map data in function", data.response.venues);
    console.log("get ln and lt data in function", lt, ln);
    setMap(data.response.venues);
    setLn(ln);
    setLt(lt);
  };

  const history = useHistory();
  const [comlist, setComList] = useState();

  const setCompany = () => {
    if (userID) {
      loading = true;
      firebase
        .firestore()
        .collection("Companies")
        .limit(limit)
        .where("userId", "==", userID)
        .onSnapshot((response) => {
          const list = [];
          response.forEach((doc) => {
            const comp = doc.data();
            list.push({ ...comp, companiesId: doc.id });
          });
          setComList(list);
          console.log("listttt***", list);
        });

      loading = false;
    }
  };
  const isBottom = (el) => {
    if (el) {
      return el.getBoundingClientRect().bottom <= window.innerHeight + 10;
    }
  };

  const trackScrolling = () => {
    const wrappedElement = document.getElementById("header");
    if (isBottom(wrappedElement) && !loading) {
      console.log("header bottom reached", limit);
      setLimit(limit + 2);

      document.removeEventListener("scroll", trackScrolling);
    }
  };

  console.log("testtt", comlist);
  const onAddCompany = () => {
    addCompany(name, since, timing, address, img, userID, lt, ln, currentToken);
    setShow(false);
    setCompany();
  };

  const [show, setShow] = useState(false);

  const [name, setName] = useState("");
  const [since, setSince] = useState("");
  const [img, setImg] = useState();
  const [timing, setTiming] = useState("");
  const [address, setAddress] = useState();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const onImageUpload = (e) => {
    setImg(e.target.files[0]);
  };

  return (
    <div id="header">
      <h1 style={{ textAlign: "center", color: "white", fontSize: "60px" }}>
        Companies
      </h1>
      {comlist &&
        comlist.map((items) => {
          return (
            <div
              className="container2"
              onClick={() => history.push(`/detail/${items.companiesId}`)}
            >
              <h1>{items.name}</h1>
            </div>
          );
        })}

      <Modal show={show} onHide={handleClose} style={{ opacity: "1" }}>
        <ModalHeader>
          <Modal.Title>Add Company</Modal.Title>
        </ModalHeader>

        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Comapany Name</Form.Label>

              <Form.Control
                type="text"
                onChange={(e) => setName(e.target.value)}
                required={true}
              ></Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Label>Since</Form.Label>

              <Form.Control
                type="text"
                onChange={(e) => setSince(e.target.value)}
                required
              ></Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Label>Certificates</Form.Label>

              <Form.Control
                type="file"
                onChange={onImageUpload}
                required
              ></Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Label>Timings</Form.Label>

              <Form.Control
                type="text"
                onChange={(e) => setTiming(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group></Form.Group>
          </Form>

          <select
            onChange={(e) => {
              setAddress(e.target.value);
            }}
          >
            {location &&
              location.map((items) => (
                <option value={items.name}>{items.name}</option>
              ))}
          </select>

          <MapComponent
            isMarkerShown
            googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `400px` }} />}
            mapElement={<div style={{ height: `100%` }} />}
            getMapData={getMapData}
          />
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="success" onClick={onAddCompany}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>

      {/* List of company */}

      <div>
        <div className="con" onClick={handleShow}>
          <h1>+</h1>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  console.log("state in Home", state);
  return {
    data: state.companyReducer.company,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAndSetCompany: () => dispatch(setCompany()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Company);
