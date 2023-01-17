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
  const [eremail, setErEmail] = useState();
const[erphone,setErPhone]=useState();
const[erpass,setErPass]=useState();
const[ername,setErName]=useState();
// const[check, setCheck]=useState(true);
  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }
  function isValidPhone(phone) {
    return /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(phone);
  }
function isValidPassWord(password){
  return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password)
}
function isValidName(name){
  return /^[a-zA-Z\-]+$/.test(name)
}
  const handleChange = (val, field) => {
    if (field === "name") {
      setName(val);
      if(!isValidName (val)){
        setErName("Chỉ chứa kí tự từ a-z hoặc A-Z, không chứa dấu cách hoặc kí tự đặc biệt")
      }else{
        setErName("")
      }
    }
    if (field === "password") {
      setPassword(val);
      if(!isValidPassWord(val)){
        setErPass("Tối thiểu 8 ký tự, ít nhất 1 chữ cái và 1 số")
      }else{
        setErPass("")
      }
    }
    if (field === "cfpassword") {
      setcfPassword(val);
    }
    if (field === "email") {
      setEmail(val);
      if (!isValidEmail(val)){
        setErEmail("Hãy nhập đúng định dạng. Example@gmail.com");
      }else{
        setErEmail("")
      }
    }
    if (field === "phone") {
      setPhone(val);
      
      if (!isValidPhone(val)){
        setErPhone("Không hợp lệ");
      }else{
        setErPhone("")
      }
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
    }
    if(!isValidName (name) || !isValidPassWord(password)|| !isValidEmail(email)|| !isValidPhone(phone))
        return 
    // if (
    //   name === "" ||
    //   password === "" ||
    //   cfpassword === "" ||
    //   (email === "") | (phone === "")
    // ) {
    //   alert("Yêu cầu nhập đủ thông tin!!");
    // } else {
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
              <p style={{ color: "red", width:500 }}>{ername}</p>

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
              <p style={{ color: "red" }}>{eremail}</p>
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
              <p style={{ color: "red" }}>{erphone}</p>

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
              <p style={{ color: "red" }}>{erpass}</p>

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
                width: 600,
                height: 400,
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
