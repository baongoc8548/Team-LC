import React, { useState, useEffect } from "react";
import "./styles.scss";
import { Link } from "react-router-dom";
import iconDT from "../../assets/imgs/dt1.jpg";
import desktop from "../../assets/imgs/laptophouse4.png";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import { Form, Button, Spinner, InputGroup } from "react-bootstrap";

export default function Navbar() {
  const [search, setSearch] = useState("");
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const customerName = localStorage.getItem("customerName");
  const accessToken = localStorage.getItem("accessToken");
  const handleLogout = () => {
    localStorage.clear("accessToken");
  };

  
  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const navigate = useNavigate();
  const onSubmitSearch = (product) => {
    // handleCallAPI(search);
    setLoading(true);
    axios
      .get(`https://lapcenter-v1.onrender.com/api/product?productName=${search}`, {
        params: {
          productName: product?.name,
          pageSize: 6,
          pageNumber: page,
        },
      })
      .then(function (response) {
        // handle success
        console.log("SUCCESS: ", response.data);
        setLoading(false);
        setList(response.data.products);
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

  
  
  return (
    <div className="navbar-Container">
      <div className="top d-flex">
        <div className="search d-flex">
          <div className="dienthoai d-flex">
            <img src={iconDT} alt="" width={50} height={40} className="dt" />
            <h5>1800.0095</h5>
          </div>

          <InputGroup className="mb-3">
            <Form.Control
              value={search}
              onChange={(e) => {
                handleChange(e.target.value);
              }}
              placeholder="Tìm Kiếm..."
              //   aria-label="Recipient's username"
              aria-describedby="basic-addon2"
            />
            <Button
              variant="outline-secondary"
              // id="button-addon2"
              className="btn-search"
              // onClick={onSubmitSearch}
              onClick={onSubmitSearch}
            >
              Search
            </Button>
          </InputGroup>
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
