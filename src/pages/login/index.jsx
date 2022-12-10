import React, { useState } from "react";
import { Form, Col, Row, Button } from "react-bootstrap";
import Navbar from "../../components/navbar";
import axios from "axios";
import "./styles.scss";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/footer"

import "./styles.scss";
const fakeAccount = { username: "admin", password: "admin" };

export default function Login() {
  let navigate = useNavigate();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const handleChange = (val, field) => {
    if (field === "username") {
      setUsername(val);
      console.log("USERNAME:", val);
    } else {
      setPassword(val);
      console.log("PASSWORD:", val);
    }
  };
  const handleOnLogin = () => {
    if (
      username === fakeAccount.username &&
      password === fakeAccount.password
    ) {
      console.log("DANG NHAP THANH CONG");
      navigate("/");
    } else {
      console.log("DANG NHAP KHONG THANH CONG");
      alert("Tên hoặc mật khẩu không chính xác.vui lòng nhập lại!?");
    }
  };
  const hanldeLogin = () => {
    axios
      .post("https://lapcenter-v1.onrender.com/api/login", {
        username: username,
        password: password,
      })
      .then(function (response) {
        console.log("SUCCESS:", response.data);
        localStorage.setItem("customerName", response.data.userName);
        localStorage.setItem("accessToken", response.data.token);
        localStorage.setItem("userId", response.data.userId);
        localStorage.setItem("isAdmin", response.data.isAdmin);
        navigate("/");
      })
      .catch(function (error) {
        console.log("ERROR", error);
        alert(
          "Tên tài khoản hoặc mật khẩu không chính xác. vui lòng thử lại!!!"
        );
      });
  };
  return (
    <>
    <Navbar />
    <div className="container">
      
      <div className="content">
        <div className="left">
          <img
            src={require("../../assets/imgs/login.jpg")}
            alt=""
            style={{ marginLeft: -20, marginTop: 50 }}
          />
          <br />
        </div>
        <div className="right" style={{ paddingLeft: 50 }}>
          <Form>
            <h2
              className=""
              style={{
                textAlign: "center",
                fontWeight: "bold",
                fontSize: 40,
                color: 'black',
                paddingBottom: 40,
              }}
            >
              {" "}
              ĐĂNG NHẬP
            </h2>
            <Form.Group
              as={Row}
              className="mb-3 d-flex justify-content-between"
              controlId="formPlaintextEmail"
            >
              <Col sm="12">
                <div className="icon d-flex">
                  <i
                    class="bi bi-person-circle"
                    style={{ color: "#306d78", fontSize: 32, paddingRight: 20 }}
                  ></i>

                  <Form.Control
                    className="namepass txtnamepass"
                    type="text"
                    placeholder="Email hoặc Số điện thoại"
                    value={username}
                    onChange={(e) => handleChange(e.target.value, "username")}
                  />
                </div>
              </Col>
            </Form.Group>

            <Form.Group
              as={Row}
              className="mb-3  d-flex justify-content-between"
              controlId="formPlaintextPassword"
            >
              <Col sm="12">
                <div className="icon d-flex ">
                  <i class="bi bi-lock-fill" style={{ color: "#306d78", fontSize: 32, paddingRight: 20 }}></i>
                  <Form.Control
                    className="namepass txtnamepass"
                    type="password"
                    placeholder="Mật khẩu"
                    value={password}
                    onChange={(e) => handleChange(e.target.value, "password")}
                  />
                </div>
              </Col>
            </Form.Group>
            <div>
              <Button
                className="custom-btn btn-3"
                variant="secondary"
                onClick={hanldeLogin}
              >
                Đăng Nhập
              </Button>{" "}
              <div className="" style={{marginLeft:150,display:'flex', marginTop:20}}>

              <span>Bạn chưa có tài khoản? </span>
              <h6 className="dangky" onClick={() => navigate("/register")}>Đăng ký</h6>
              </div>
              {/* <Button
                className="newaccount d-flex"
                onClick={() => navigate("/register")}
              >
                
              </Button> */}
            </div>
          </Form>
          {/* <h1 className='signin'>Sign in</h1>
                <div className="username d-flex">
                <img src={require('../../assets/imgs/user.png')}alt="" className='userimg'/>
                <input type="text" placeholder='User Name' className='namepass' />
                </div>

                <div className="pass d-flex">
                <img src={require('../../assets/imgs/lock.png')}alt="" className='userimg'/>
                <input type="password" placeholder='Password' className='namepass'/>
                </div>
                <button className='btnlogin'>Đăng Nhập</button> */}
        </div>
      </div>
      
    </div>
    <Footer/>
    </>
    
  );
}
