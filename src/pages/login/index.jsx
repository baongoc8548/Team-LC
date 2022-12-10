import React, { useState } from "react";
import { Form, Col, Row, Button } from "react-bootstrap";
import Navbar from "../../components/navbar";
import axios from "axios";
import "./styles.scss";
import { useNavigate } from "react-router-dom";

import "./styles.scss";
const fakeAccount={username:"admin",password:"admin"}

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
  const handleOnLogin=() =>{
    if(username===fakeAccount.username && password === fakeAccount.password){
       console.log ("DANG NHAP THANH CONG");
       navigate('/')
    }else{
      console.log("DANG NHAP KHONG THANH CONG")
      alert("tên tài khoản hoặc mật khẩu không chính xác.vui lòng nhập lại!?")
    }
  };
  const hanldeLogin = () => {
 
    axios
      .post("https://lap-center.herokuapp.com/api/login", {
        username: username,
        password: password,
      })
      .then(function (response) {
        console.log("SUCCESS:", response.data);
        localStorage.setItem('customerName', response.data.userName)
        localStorage.setItem('accessToken', response.data.token)
        localStorage.setItem('userId', response.data.userId)
        localStorage.setItem('isAdmin', response.data.isAdmin)
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
      <div className='container'>
        <Navbar/>
        <div className="content">
            <div className="left">
            <video controls className='video' autoPlay muted  type="video/mp4"
            
           src={require('../../assets/imgs/typing.mp4')}>

            </video>
            <br />
            </div>
            <div className="right">
            <Form>
          <h2 className="h2text"> ĐĂNG NHẬP</h2>
          <Form.Group
            as={Row}
            className="mb-3 d-flex justify-content-between"
            controlId="formPlaintextEmail"
          >
            <Col sm="12">
            <Form.Label className="txtnamepass">
          
              Tên hoặc Số Điện Thoại:
            </Form.Label>
              <Form.Control
                 className="namepass txtnamepass"
                type="text"
                placeholder="User Name"
                value={username}
                onChange={(e) => handleChange(e.target.value, "username")}
              />
            </Col>
          </Form.Group>

          <Form.Group
            as={Row}
            className="mb-3  d-flex justify-content-between"
            controlId="formPlaintextPassword"
          >
            <Col sm="12">
            <Form.Label className="txtnamepass">
              Mật Khẩu:
            </Form.Label>
              <Form.Control
              className="namepass txtnamepass"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => handleChange(e.target.value, "password")}
              />
            </Col>
          </Form.Group>
          <div>
            <Button  className="btnlogin" variant="secondary" onClick={hanldeLogin} >Đăng Nhập</Button>{" "}
            <Button className="newaccount d-flex" onClick={()=> navigate("/register")}>Bạn chưa tạo tài khoản ?</Button>

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
  )
}
