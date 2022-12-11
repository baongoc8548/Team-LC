import { Form, Col, Row, Button } from "react-bootstrap";
import React, { useState } from "react";
import "./styles.scss";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// import iconHome from "../../assets/imgs/iconHome.png"
import Navbar from "../../components/navbar";


export default function Register() {
  let navigate = useNavigate();

  const [name, setName] = useState();
  const [password, setPassword] = useState();
  const [email, setEmail ]= useState();
  const [phone, setPhone ]= useState();


  // const [confirmPassword, setConfirmPassword] = useState();

  const handleChange = (val, field) => {
    if (field === "name") {
      setName(val);
    }
    if (field === "password") {
      setPassword(val);
    } 
    if (field === "email") {
      setEmail(val);}
      if (field === "phone") {
        setPhone(val);}
  };
  const handleOnRegister = () => {
    alert("tạo tài khoản thành công");
    navigate("/login");
  };
  const hanldeRegister=()=>{
    const url='https://lapcenter-v1.onrender.com/api/register'
    // if(name===fakeAccount.name && password===fakeAccount.password){
    //   console.log("DANG NHAP THANH CONG!");
    //   navigate('/')

    // }
    // else{
    //   console.log("DANG NHAP KHONG THANH CONG!")
    //   alert("Tên tài khoản hoặc mật khẩu không chính xác. vui lòng thử lại!!!")
    // }
    axios.post(url  , {
      name: name,
      email:email,
      phone:phone,
      password: password
    })
    .then(function (response) {
      console.log("SUCCESS:",response.data);
      alert("Tài khoản đã đăng kí thành công")

      navigate('/login')

    })
    .catch(function (error) {
      console.log("ERROR:",error);
      alert("Lỗi đăng kí, vui lòng thử lại!!!")

    });
  }
  return (
    <>
        <Navbar/>   
        <div className="main">

      <div className="registerContainer d-flex">
        {/* <div className="main d-flex"> */}

        <div className="left">
            <h2 style={{marginLeft:320 ,marginTop:40 , marginBottom:30 ,fontSize:45}}>Đăng Ký</h2>
            <div className="user">
            <i class="bi bi-person-circle" style={{ color: "#306d78", fontSize: 32, paddingRight: 20 }}></i>
            <input  value={name}
                onChange={(e) => handleChange(e.target.value, "name")} type="text" placeholder="Tên Người Dùng"  className="txtuser"  />
            </div>

            <div className="user">
            <i class="bi bi-envelope" style={{ color: "#306d78", fontSize: 32, paddingRight: 20 }}></i>
            <input value={email}
                onChange={(e) => handleChange(e.target.value, "email")} type="text" placeholder="Email" className="txtuser"/>
            </div>

            <div className="user">
            <i class="bi bi-telephone" style={{ color: "#306d78", fontSize: 32, paddingRight: 20 }}></i>
            <input  value={phone}
                onChange={(e) => handleChange(e.target.value, "phone")} type="text" placeholder="Số Điện Thoại"  className="txtuser"/>
            </div>

            <div className="user">
            <i class="bi bi-lock" style={{ color: "#306d78", fontSize: 32, paddingRight: 20 }}></i>
            <input  value={password}
                onChange={(e) =>
                  handleChange(e.target.value, "password")} type="text" placeholder="Mật Khẩu"  className="txtuser"/>
            </div>

            {/* <div className="user">
            <i class="bi bi-lock-fill" style={{ color: "#306d78", fontSize: 32, paddingRight: 20 }}></i>
            <input type="text" placeholder="Nhập Lại Mật Khẩu"  className="txtuser"/>
            </div> */}
            <button variant="secondary"
              className="custom-btn btn-3"
              onClick={hanldeRegister}>Đăng Kí</button>

        </div>

        <div className="right">
        <img
            src={require("../../assets/imgs/register.jpg")}
            alt=""
            style={{width:600,height:400,marginTop:110,marginLeft:-100}}
          />

    
</div>
   
      </div>
        </div>
    </>
   
  );
}
