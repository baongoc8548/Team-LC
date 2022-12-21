import React from "react";
import "./styles.scss";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
export default function HomeAdmin() {
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("accessToken");

  const handleLogout = () => {
    localStorage.clear("accessToken");
    navigate("/login");
  };
  return (
    <div className="homeAdminContainer">
      <div className="top d-flex">
        <p
          className="txtdx"
          style={{ color: "yellow", fontSize: 40, marginLeft: 20 }}
        >
          Chào Mừng Quản Trị Viên
        </p>
        <img
          src={require("../../../assets/imgs/laptophouse4.png")}
          alt=""
          style={{ width: 300, height: 190, marginTop: -20, marginLeft: -150 }}
        />
        <div className="change">
          <ul className="d-flex">
            <li onClick={handleLogout}>
              {" "}
              <a href="">ĐĂNG XUẤT</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="main d-flex">
        <div className="left custom-btn">
          <h3 style={{ marginLeft: 100, marginTop: 10, color: " #306d78" }}>
            Danh Mục
          </h3>
          <p className="lefttxt mt">Quản Lí Đơn Hàng</p>
          <p className="lefttxt">Quản Lí Sản Phẩm</p>
          <p className="lefttxt">Quản Lí Tài Khoản</p>
          <p className="lefttxt">Quản Lí Đánh Giá</p>
          <p className="lefttxt">Báo Cáo Thống Kê</p>
        </div>
        <div className="right"></div>
      </div>
    </div>
  );
}
