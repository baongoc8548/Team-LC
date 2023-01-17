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
        setMessage("Số điện thoại không hợp lệ");
      }
    } else {
      if (!isValidEmail(email)) {
        if (!isValidPhone(phone)) {
          setModalConfirm(true);
          setMessage("Email và số điện thoại không hợp lệ");
        } else {
          setModalConfirm(true);
          setMessage("Email không đúng định dạng 'Example@gmail.com'");
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
        setMessage("Đặt hàng thành công!!!");
        setModalConfirm(true);
        setLoading(false);
        // alert("Tạo đơn hàng thành công!!");
        // window.location.replace(`http://localhost:3000/`);
        // window.location.replace(`http://localhost:3000/product/${product._id}`);
        // console("đặt thành công");
        // setMessage("Tạo đơn hàng thành công!!!");

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
            console.log("Đã thêm sản phẩm vào lịch sử mua hàng.", response);
          })
          .catch(function (error) {
            console.log("Không thể thêm sản phẩm vào lịch sử mua hàng.", error);
          });
      })
      .catch((err) => {
        setModalConfirm(true);
        setMessage("Đặt hàng thất bại!!!");
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
              Thanh Toán
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
                <i class="bi bi-check2-circle" style={{ fontSize: 30 }}></i> Để
                đặt hàng,{" "}
              </b>
              <span>
                quý khách vui lòng kiểm tra sản phẩm, số lượng, giá, và điền các
                thông tin dưới đây
              </span>
              <br />
              <br />
              <div className="d-flex mt-4">
                <h4>SẢN PHẨM</h4>

                <h6 style={{ marginLeft: 990, paddingRight: 230 }}>Đơn giá</h6>
                <h6 style={{}}>Số lượng</h6>
              </div>
              <div className="d-flex justify-content-between mt-4">
                <img src={image} width={150} height={100} alt="" />
                <p className="fw-bold h4 mt-3">{product?.name}</p>
                <p className=" h5 mt-3"> {product?.price}đ</p>
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
              <p className="fw-bold h4">Thành tiền: </p>
              <p className="fw-bold text-danger h3" style={{ marginLeft: 30 }}>
                {totalPrice} VND
              </p>
            </div>
            <div className="order">
              <i
                class="bi bi-geo-alt-fill"
                style={{ fontSize: 25, color: "red", fontWeight: "bolder" }}
              >
                Thông tin và địa chỉ nhận hàng
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
                    <Form.Label>Họ tên</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Họ tên"
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
                    <Form.Label>Số điện thoại</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Số điện thoại"
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
                    <Form.Label>Địa chỉ nhận hàng</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      type="text"
                      placeholder="Địa chỉ nhận hàng"
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
                    Đặt hàng
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
              XÁC NHẬN THÔNG TIN
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="d-flex">
              <div>
                <img src={image} width={200} height={150} alt="" />
              </div>
              <div className="mx-5">
                <div>
                  <h5 className="text-danger">Thông tin sản phẩm</h5>
                  <span>Tên sản phẩm: </span>{" "}
                  <span className="fw-bold">{product?.name}</span>
                  <br />
                  <span>Hãng:</span>{" "}
                  <span className="fw-bold">{product?.brand} </span>
                  <br />
                  <span>Số lượng: </span>{" "}
                  <span className="fw-bold">{quantity}</span>
                  <br />
                  <span>Tổng tiền: </span>{" "}
                  <span className="fw-bold">{totalPrice} VNĐ </span>
                </div>
                <div className="mt-3">
                  <h5 className="text-danger">Thông tin khách hàng</h5>
                  <span>Tên Khách hàng: </span>{" "}
                  <span className="fw-bold">{name}</span>
                  <br />
                  <span>Email </span>
                  <span className="fw-bold">{email}</span>
                  <br />
                  <span>Số điện thoại: </span>{" "}
                  <span className="fw-bold">{phone}</span>
                  <br />
                  <span>Địa chỉ: </span>
                  <span className="fw-bold">{address}</span>
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={handleOrderProduct}>Xác nhận</Button>
            <Button onClick={() => setModalShow(false)}>Hủy</Button>
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
              Thông báo
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="d-flex">
              <div className="">
                <p><i class="bi bi-clipboard-check" style={{color: 'red', fontSize: 30, paddingRight: 10 }}></i>{message}</p>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => setModalConfirm(false)}>Đóng</Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
}
