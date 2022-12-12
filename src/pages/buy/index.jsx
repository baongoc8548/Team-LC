import React, { useState, useEffect } from "react";
import Navbar from "../../components/navbar";
import "./styles.scss";
import { Button, Spinner } from "react-bootstrap";
import axios from "axios";
import { Form, Col, Row, InputGroup } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import Modal from "react-bootstrap/Modal";

export default function Buy() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [address, setAddress] = useState();
  const [quantity, setQuantity] = useState(1);
  const [modalShow, setModalShow] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [product, setProduct] = useState();
  const [image, setImage] = useState();
  const [loading, setLoading] = useState(true);
  const [modalConfirm, setModalConfirm] = useState(false);
  const [message, setMessage] = useState();
  const userId = localStorage.getItem("userId");
  const { state } = useLocation();
  const getProductId = () => {
    setLoading(true);
    axios
      .get(
        `https://lapcenter-v1.onrender.com/api/product/getProductById/${state.id}`
      )
      .then(function (response) {
        // handle success
        const data = response.data.response;
        console.log("SUCCESS: ", data);
        setProduct(data);
        setTotalPrice(1 * data.price);
        setImage(data.images[0]);
        setLoading(false);
      })
      .catch(function (error) {
        // handle error
        console.log("ERROR: ", error);
        setLoading(false);
        alert("Something went wrong!!!");
      })
      .then(function () {
        // always executed
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
      setTotalPrice(product?.price);
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
        // alert("Tạo đơn hàng thành công!!");
        setModalConfirm(true);
        setMessage("Tạo đơn hàng thành công!!!");
        setLoading(false);
        axios
          .post(
            "https://lapcenter-v1.onrender.com/api/history/addProductToHistory",
            {
              userId: userId,
              phone: phone,
              address: address,
              productName: product.name,
              productBrand: product.brand,
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
        setMessage("Tạo đơn hàng thất bại!!!");
        setLoading(false);
      });
    setModalShow(false);
  };
  return (
    <>
      <Navbar />
      <div className="buyContainer">
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
            <div className="d-flex mt-4" >
              <h4>SẢN PHẨM</h4>
          
              <h6 style={{marginLeft:990, paddingRight:230}}>Đơn giá</h6>
              <h6 style={{}}>Số lượng</h6>
              
              
            </div>
            <div className="d-flex justify-content-between mt-4">
              <img src={image} width={150} height={100} alt="" />
              <p className="fw-bold h4 mt-3">{product?.name}</p>
              <p className=" h5 mt-3"> {product?.price}đ</p>
              <div className="mt-3 d-flex">
                <div className="minus"  onClick={() => handleUpOrDownQuantity("minus")}>
                <i class="bi bi-dash-square" style={{fontSize:30, color:'gray',marginBottom:50}} ></i>

                </div>
                {/* <Button
                  className="mx-2"
                  variant="primary"
                 
                >
                  <i class="fa-solid fa-circle-minus"></i>
                </Button> */}

                <input
                  type="number"
                  className="inp"
                  value={quantity}
                  onChange={(e) => hanldeChangeQuatity(e.target.value)}
                />
                <div className="minus"  onClick={() => handleUpOrDownQuantity("plus")}>
                <i class="bi bi-plus-square" style={{fontSize:30, color:'gray'}} ></i>

                </div>
                {/* <Button
                  className="mx-2"
                  variant="primary"
                  onClick={() => handleUpOrDownQuantity("plus")}
                >
                  <i class="fa-solid fa-circle-plus"></i>
                </Button> */}
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-between">
            <div />
          </div>
          <hr />
          <div className="d-flex" style={{marginLeft:1100}}>
            <p className="fw-bold h4">Thành tiền:   </p>
            <p className="fw-bold text-danger h3"style={{marginLeft:30}}>{totalPrice} VND</p>
          </div>
          <div className="order">
          <i class="bi bi-geo-alt-fill" style={{fontSize:25, color:'red', fontWeight:'bolder'}}>Thông tin và địa chỉ nhận hàng</i>
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
                    type="text"
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
                  onClick={() => setModalShow(true)}
                >
                  Đặt hàng
                </Button>{" "}
              </div>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
}
