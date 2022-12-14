import React, { useState, useEffect } from "react";
import Navbar from "../../components/navbar";
import "./styles.scss";
import { Button, Spinner } from "react-bootstrap";
import axios from "axios";
import { Form, Col, Row, InputGroup } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import MyCartIcon from "../../components/MyCartAndHistory";
export default function Buy() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [address, setAddress] = useState();
  const [quantity, setQuantity] = useState(1);
  const [modalShow, setModalShow] = React.useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [product, setProduct] = useState();
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(true);
  const [modalConfirm, setModalConfirm] = React.useState(false);
  const [message, setMessage] = useState();
  const userId = localStorage.getItem("userId");
  const customerName = localStorage.getItem("customerName");

  const { state } = useLocation();
  const getProductId = () => {
    setLoading(true);
    axios
      .get(
        `https://lapcenter-v1.onrender.com/api/product/getProductById/${state?.id}`
      )
      .then(function (response) {
        // handle success
        setLoading(false);
        const data = response.data.response;
        console.log("SUCCESS: ", data);
        setProduct(data);
        setTotalPrice(1 * data?.price);
        setImage(data.images[0]);
      })
      .catch(function (error) {
        // handle error
        setLoading(false);
        alert("Something went wrong!!!");
        console.log("ERROR: ", error);
      });
  };
  const handleChange = (val, field) => {
    if (field === "name") {
      setName(val);
    }
    if (field === "address") {
      setAddress(val);
    }
    if (field === "email") {
      setEmail(val);
    }
    if (field === "phone") {
      setPhone(val);
    }
  };
  const hanldeChangeQuatity = (val) => {
    const value = parseInt(val);
    if (value < 1) {
      setQuantity(1);
      setTotalPrice(1 * product?.price);
    } else {
      setQuantity(val);
      setTotalPrice(val * product?.price);
    }
  };
  const handleUpOrDownQuantity = (method) => {
    if (method === "plus") {
      setQuantity(quantity + 1);
      setTotalPrice((quantity + 1) * product?.price);
    } else {
      if (quantity < 2) {
        setQuantity(1);
        setTotalPrice(1 * product?.price);
      } else {
        setQuantity(quantity - 1);
        setTotalPrice((quantity - 1) * product?.price);
      }
    }
  };

  useEffect(() => {
    getProductId();
  }, []);
  let checkInfo = false;
  if (!name || !phone || !email || !address) checkInfo = false;
  if (name && phone && email && address) checkInfo = true;

  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }

  function isValidPhone(phone) {
    return /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(phone);
  }

  const checkValidation = () => {
   
    if (isValidEmail(email)) {
      if (isValidPhone(phone)) {
        setModalShow(true);
      } else {
        setModalConfirm(true);
        setMessage("S??? ??i???n tho???i kh??ng h???p l???");
      }
    } else {
      if (!isValidEmail(email)) {
        if (!isValidPhone(phone)) {
          setModalConfirm(true);
          setMessage("Email v?? s??? ??i???n tho???i kh??ng h???p l???");
        } else {
          setModalConfirm(true);
          setMessage("Email kh??ng ????ng ?????nh d???ng 'Example@gmail.com'");
        }
      }
    }
  };

  const handleOrderProduct = () => {
    setLoading(true);
    axios
      .post("https://lapcenter-v1.onrender.com/api/order/addOrder", {
        customerName: name,
        email: email,
        phone: phone,
        address: address,
        productName: product?.name,
        productBrand: product?.brand,
        quantity: quantity,
        orderStatus: 1,
      })
      .then((res) => {
        // setModalShow(false);
        setMessage("?????t h??ng th??nh c??ng!!!");
        setModalConfirm(true);
        setLoading(false);
        // alert("T???o ????n h??ng th??nh c??ng!!");
        // window.location.replace(`http://localhost:3000/`);
        // window.location.replace(`http://localhost:3000/product/${product._id}`);
        // console("?????t th??nh c??ng");
        // setMessage("T???o ????n h??ng th??nh c??ng!!!");

        // setModalConfirm(true);
        axios
          .post(
            "https://lapcenter-v1.onrender.com/api/history/addProductToHistory",
            {
              userId: userId,
              phone: phone,
              address: address,
              productName: product?.name,
              productBrand: product?.brand,
              quantity: quantity,
            }
          )
          .then(function (response) {
            console.log("???? th??m s???n ph???m v??o l???ch s??? mua h??ng.", response);
          })
          .catch(function (error) {
            console.log("Kh??ng th??? th??m s???n ph???m v??o l???ch s??? mua h??ng.", error);
          });
      })
      .catch((err) => {
        setModalConfirm(true);
        setMessage("?????t h??ng th???t b???i!!!");
        setLoading(false);
      });
    setModalShow(false);
  };
  return (
    <>
      <Navbar />
      {customerName && <MyCartIcon />}

      <div className="buyContainer">
        {loading === false ? (
          <div className="formBuy">
            <h1 className="text-danger">
              {" "}
              <i
                class="bi bi-bag-check-fill"
                style={{ fontSize: 50, color: "red" }}
              ></i>{" "}
              Thanh To??n
            </h1>
            <div>
              <b
                className="text-danger"
                style={{
                  fontSize: 20,
                  marginLeft: 350,
                  paddingBottom: 200,
                  textAlign: "center",
                }}
              >
                <i class="bi bi-check2-circle" style={{ fontSize: 30 }}></i> ?????
                ?????t h??ng,{" "}
              </b>
              <span>
                qu?? kh??ch vui l??ng ki???m tra s???n ph???m, s??? l?????ng, gi??, v?? ??i???n c??c
                th??ng tin d?????i ????y
              </span>
              <br />
              <br />
              <div className="d-flex mt-4">
                <h4>S???N PH???M</h4>

                <h6 style={{ marginLeft: 990, paddingRight: 230 }}>????n gi??</h6>
                <h6 style={{}}>S??? l?????ng</h6>
              </div>
              <div className="d-flex justify-content-between mt-4">
                <img src={image} width={150} height={100} alt="" />
                <p className="fw-bold h4 mt-3">{product?.name}</p>
                <p className=" h5 mt-3"> {product?.price}??</p>
                <div className="mt-3 d-flex">
                  <div
                    className="minus"
                    onClick={() => handleUpOrDownQuantity("minus")}
                  >
                    <i
                      class="bi bi-dash-square"
                      style={{ fontSize: 30, color: "gray", marginBottom: 50 }}
                    ></i>
                  </div>

                  <input
                    type="number"
                    className="inp"
                    value={quantity}
                    onChange={(e) => hanldeChangeQuatity(e.target.value)}
                  />
                  <div
                    className="minus"
                    onClick={() => handleUpOrDownQuantity("plus")}
                  >
                    <i
                      class="bi bi-plus-square"
                      style={{ fontSize: 30, color: "gray" }}
                    ></i>
                  </div>
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-between">
              <div />
            </div>
            <hr />
            <div className="d-flex" style={{ marginLeft: 1100 }}>
              <p className="fw-bold h4">Th??nh ti???n: </p>
              <p className="fw-bold text-danger h3" style={{ marginLeft: 30 }}>
                {totalPrice} VND
              </p>
            </div>
            <div className="order">
              <i
                class="bi bi-geo-alt-fill"
                style={{ fontSize: 25, color: "red", fontWeight: "bolder" }}
              >
                Th??ng tin v?? ?????a ch??? nh???n h??ng
              </i>
              <br />
              <br />
              <Form>
                <Form.Group
                  as={Row}
                  className="mb-3 d-flex justify-content-between"
                  controlId="formPlaintextname"
                >
                  <Col sm="12" className="">
                    <Form.Label>H??? t??n</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="H??? t??n"
                      value={name}
                      onChange={(e) => handleChange(e.target.value, "name")}
                    />
                  </Col>
                </Form.Group>
                <Form.Group
                  as={Row}
                  className="mb-3 d-flex justify-content-between"
                  controlId="formPlaintextname"
                >
                  <Col sm="12" className="">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => handleChange(e.target.value, "email")}
                    />
                  </Col>
                </Form.Group>
                <Form.Group
                  as={Row}
                  className="mb-3 d-flex justify-content-between"
                  controlId="formPlaintextname"
                >
                  <Col sm="12" className="">
                    <Form.Label>S??? ??i???n tho???i</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="S??? ??i???n tho???i"
                      value={phone}
                      pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                      onChange={(e) => handleChange(e.target.value, "phone")}
                    />
                  </Col>
                </Form.Group>

                <Form.Group
                  as={Row}
                  className="mb-3 d-flex justify-content-between"
                  controlId="formPlaintextPassword"
                >
                  <Col sm="12">
                    <Form.Label>?????a ch??? nh???n h??ng</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      type="text"
                      placeholder="?????a ch??? nh???n h??ng"
                      value={address}
                      onChange={(e) => handleChange(e.target.value, "address")}
                    />
                  </Col>
                </Form.Group>

                <div className="d-flex justify-content-center mt-4">
                  <Button
                    variant="success"
                    className=""
                    disabled={!checkInfo}
                    onClick={() => checkValidation()}
                    // onClick={() => setModalShow(true)}
                  >
                    ?????t h??ng
                  </Button>{" "}
                </div>
              </Form>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <Spinner animation="border" variant="danger" />
          </div>
        )}
        <Modal
          show={modalShow}
          onHide={() => setModalShow(false)}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          backdrop="static"
        >
          <Modal.Header closeButton>
            <Modal.Title
              id="contained-modal-title-vcenter"
              className="text-danger"
            >
              X??C NH???N TH??NG TIN
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="d-flex">
              <div>
                <img src={image} width={200} height={150} alt="" />
              </div>
              <div className="mx-5">
                <div>
                  <h5 className="text-danger">Th??ng tin s???n ph???m</h5>
                  <span>T??n s???n ph???m: </span>{" "}
                  <span className="fw-bold">{product?.name}</span>
                  <br />
                  <span>H??ng:</span>{" "}
                  <span className="fw-bold">{product?.brand} </span>
                  <br />
                  <span>S??? l?????ng: </span>{" "}
                  <span className="fw-bold">{quantity}</span>
                  <br />
                  <span>T???ng ti???n: </span>{" "}
                  <span className="fw-bold">{totalPrice} VN?? </span>
                </div>
                <div className="mt-3">
                  <h5 className="text-danger">Th??ng tin kh??ch h??ng</h5>
                  <span>T??n Kh??ch h??ng: </span>{" "}
                  <span className="fw-bold">{name}</span>
                  <br />
                  <span>Email </span>
                  <span className="fw-bold">{email}</span>
                  <br />
                  <span>S??? ??i???n tho???i: </span>{" "}
                  <span className="fw-bold">{phone}</span>
                  <br />
                  <span>?????a ch???: </span>
                  <span className="fw-bold">{address}</span>
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={handleOrderProduct}>X??c nh???n</Button>
            <Button onClick={() => setModalShow(false)}>H???y</Button>
          </Modal.Footer>
        </Modal>
        <Modal
          show={modalConfirm}
          onHide={() => setModalConfirm(false)}
          size="md"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          backdrop="static"
        >
          <Modal.Header closeButton>
            <Modal.Title
              id="contained-modal-title-vcenter"
              className="text-danger"
            >
              Th??ng b??o
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="d-flex">
              <div className="mx-5">
                <p>{message}</p>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => setModalConfirm(false)}>????ng</Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
}
