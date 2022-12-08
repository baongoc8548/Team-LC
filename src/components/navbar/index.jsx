import React from "react";
import "./styles.scss";
import { Link } from "react-router-dom";
import iconDT from "../../assets/imgs/dt1.jpg";
import desktop from "../../assets/imgs/laptophouse4.png";

import { Form, Button, Spinner, InputGroup, Dropdown } from "react-bootstrap";

export default function Navbar() {
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
              placeholder="Tìm Kiếm..."
              //   aria-label="Recipient's username"
              aria-describedby="basic-addon2"
            />
            <Button
              variant="outline-secondary"
              id="button-addon2"
              className="btn-search"
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
            <li>
              <Link to="/">ĐĂNG KÝ</Link>{" "}
            </li>
            |
            <li>
              <Link to="/about">ĐĂNG NHẬP</Link>
            </li>
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
            <Link to="/about">SẢN PHẨM</Link>
          </li>

          <li>
            <Link to="/login">TIN TỨC</Link>
          </li>
          <li>
            <Link to="/login">LIÊN HỆ</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
