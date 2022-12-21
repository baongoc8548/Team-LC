import React from "react";
import "./styles.scss";
import { Link } from "react-router-dom";
import iconDT from "../../assets/imgs/dt1.jpg";
import desktop from "../../assets/imgs/laptophouse4.png";

export default function Navbar() {
  const customerName = localStorage.getItem("customerName");
  const accessToken = localStorage.getItem("accessToken");

  const handleLogout = () => {
    localStorage.clear("accessToken");
  };

  return (
    <div className="navbar-Container">
      <div className="top d-flex">
        <div className="search d-flex">
          <div className="dienthoai d-flex">
            <img src={iconDT} alt="" width={50} height={40} className="dt" />
            <h5>1800.0095</h5>
          </div>
        </div>
        <div className="logo">
          <img src={desktop} alt="" width={300} height={200} className="hh" />
        </div>
        <div className="change d-flex">
          <ul className="d-flex">
            {accessToken ? (
              <div
                className="d-flex"
                style={{ marginTop: -7, paddingRight: 20 }}
              >
                <i
                  class="bi bi-person-circle"
                  style={{
                    fontSize: 30,
                    color: "rgb(180, 176, 23)",
                    paddingRight: 10,
                  }}
                ></i>
                <span style={{ color: "white", fontSize: 25 }}>
                  {customerName}
                </span>
                {""}
              </div>
            ) : (
              <li>
                <Link to="/register">ĐĂNG KÝ</Link>{" "}
              </li>
            )}
            {accessToken ? (
              <li onClick={handleLogout}>
                {" "}
                <a href="">ĐĂNG XUẤT</a>
              </li>
            ) : (
              <li>
                <Link to="/login">ĐĂNG NHẬP</Link>
              </li>
            )}
          </ul>
        </div>
      </div>
      <div className="bottom">
        <ul className="d-flex">
          <li>
            <Link to="/">TRANG CHỦ</Link>
          </li>

          <li>
            <Link to="/about">GIỚI THIỆU</Link>
          </li>
          <li>
            <Link to="/product">SẢN PHẨM</Link>
          </li>

          <li>
            <Link to="/login">TIN TỨC</Link>
          </li>
          <li>
            <Link to="/login">LIÊN HỆ</Link>
          </li>
          {/* <div>{ 
          customerName &&
          <>
          <span className="" style={{marginLeft:240, color:"306d78"}}>Chào mừng, </span><span
          className="h5">{customerName}
          </span>
          </>}
          </div> */}
        </ul>
      </div>
    </div>
  );
}
