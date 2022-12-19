import { Form, Col, Row, Button, Modal } from "react-bootstrap";
import React, { useState } from "react";
import "./styles.scss";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Navbar from "../../components/navbar";
import Footer from "../../components/footer";

export default function Register() {
  let navigate = useNavigate();

  const [name, setName] = useState();
  const [password, setPassword] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [cfpassword, setcfPassword] = useState("");

  const handleChange = (val, field) => {
    if (field === "name") {
      setName(val);
    }
    if (field === "password") {
      setPassword(val);
    }
    if (field === "cfpassword") {
      setcfPassword(val);
    }
    if (field === "email") {
      setEmail(val);
    }
    if (field === "phone") {
      setPhone(val);
    }
  };
 

  // const handleOnRegister = () => {
  //   alert("tạo tài khoản thành công");
  //   navigate("/login");
  // };
  const hanldeRegister = () => {
    if (
      name === "" ||
      password === "" ||
      cfpassword === "" ||
      (email === "") | (phone === "")
    ) {
      alert("Yêu cầu nhập đủ thông tin!!");
    } else {
      if (cfpassword === password) {
        const url = "https://lapcenter-v1.onrender.com/api/register";

        axios
          .post(url, {
            name: name,
            email: email,
            phone: phone,
            password: password,
          })
          .then(function (response) {
            console.log("SUCCESS:", response.data);
            alert("Tài khoản đã đăng kí thành công");

            navigate("/login");
          })
          .catch(function (error) {
            console.log("ERROR:", error);

            alert("Lỗi đăng kí, vui lòng thử lại!!!");
          });
      } else {
        alert("Mật khẩu không trùng nhau!!!");
        setcfPassword("");
      }
    }
  };
  // let checkInfo = true;
  // !name || !phone || !email || !password || !cfpassword
  //   ? (checkInfo = true)
  //   : (checkInfo = false);
  return (
    <>
      <Navbar />
      <div className="main">
        <div className="registerContainer d-flex">
          {/* <div className="main d-flex"> */}

          <div className="left">
            <h2
              style={{
                marginLeft: 250,
                marginTop: 40,
                marginBottom: 30,
                fontSize: 45,
              }}
            >
              Đăng Ký
            </h2>
            <div className="user">
              <i
                class="bi bi-person-circle"
                style={{ color: "#306d78", fontSize: 32, paddingRight: 20 }}
              ></i>
              <input
                value={name}
                onChange={(e) => handleChange(e.target.value, "name")}
                type="text"
                placeholder="Tên Người Dùng"
                className="txtuser"
              />
            </div>

            <div className="user">
              <i
                class="bi bi-envelope"
                style={{ color: "#306d78", fontSize: 32, paddingRight: 20 }}
              ></i>
              <input
                value={email}
                onChange={(e) => handleChange(e.target.value, "email")}
                type="email"
                placeholder="Email"
                className="txtuser"
              />
            </div>

            <div className="user">
              <i
                class="bi bi-telephone"
                style={{ color: "#306d78", fontSize: 32, paddingRight: 20 }}
              ></i>
              <input
                value={phone}
                onChange={(e) => handleChange(e.target.value, "phone")}
                type="tel"
                placeholder="Số Điện Thoại"
                className="txtuser"
              />
            </div>

            <div className="user">
              <i
                class="bi bi-lock"
                style={{ color: "#306d78", fontSize: 32, paddingRight: 20 }}
              ></i>
              <input
                value={password}
                onChange={(e) => handleChange(e.target.value, "password")}
                type="password"
                placeholder="Mật Khẩu"
                className="txtuser ps"
              />
            </div>

            <div className="user">
              <i
                class="bi bi-lock-fill"
                style={{ color: "#306d78", fontSize: 32, paddingRight: 20 }}
              ></i>
              <input
                type="password"
                placeholder="Nhập Lại Mật Khẩu"
                className="txtuser ps"
                value={cfpassword}
                onChange={(e) => handleChange(e.target.value, "cfpassword")}
              />
            </div>
            <button
              variant="secondary"
              className="custom-btn btn-3"
              onClick={hanldeRegister}
              // disabled={checkInfo}
            >
              Đăng Kí
            </button>
          </div>

          <div className="right">
            <img
              src={require("../../assets/imgs/register.jpg")}
              alt=""
              style={{
                width: 500,
                height: 300,
                marginTop: 110,
                marginLeft: -100,
              }}
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
