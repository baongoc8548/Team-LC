import React, { useState, useEffect } from "react";
import "./styles.scss";
import Navbar from "../../components/navbar";
import Card from "../../components/card";
import axios from "axios";
// import { data } from "../../data";

import { Form, Spinner } from "react-bootstrap";
import ReactPaginate from "react-paginate";
import Footer from "../../components/footer";
export default function Product() {
  const [list, setList] = useState([]);
  const [search, setSearch] = useState("");
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState();
  const [loading, setLoading] = useState(true);
  const [totalPage, setTotalPage] = useState(0);
  const [page, setPage] = useState(1);
  const customerName = localStorage.getItem("customerName");

  useEffect(() => {
    console.log("Ham nay chay dau tien");
    fetchAxios();
  }, []);

  const fetchAxios = () => {
    axios
      .get(
        "https://lapcenter-v1.onrender.com/api/product?pageSize=9&pageNumber=1"
      )
      .then(function (response) {
        // handle success
        console.log("SUCCESS: ", response.data);
        setLoading(false);
        setList(response.data.products);
        setTotalPage(response.data.totalPage);
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
  const handleChange = (val) => {
    setSearch(val);
  };
  const onSubmitSearch = () => {
    handleCallAPI(search, brand, price);
  };
  const handleSelectChange = (e) => {
    // const val = e.target.value;
    setBrand(e);
    console.log("hello a", e);

    handleCallAPI(search, e, price);
  };
  const sortPrice = (e) => {
    const val = e.target.value;

    setPrice(val);

    handleCallAPI(search, brand, val);
  };
  const handleCallAPI = (productName, productBrand, priceSort) => {
    setLoading(true);
    axios
      .get("https://lapcenter-v1.onrender.com/api/product", {
        params: {
          productName: productName,
          productBrand: productBrand,
          orderByColumn: "price",
          orderByDirection: priceSort,
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
  const handleChangePage = (pageNumber) => {
    console.log("PAGE NUMBER: ", pageNumber);
    setPage(pageNumber);
    setLoading(true);
    axios
      .get(
        `https://lapcenter-v1.onrender.com/api/product?pageSize=6&pageNumber=${pageNumber}`
      )
      .then(function (response) {
        // handle success
        console.log("SUCCESS: ", response.data);
        setLoading(false);
        setList(response.data.products);
        setTotalPage(response.data.totalPage);
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
    <>
      <Navbar />
      <div className="productContainer">
        <div className="left">
          <div className="danhmuc">
            <h3 style={{ fontWeight: "bolder" }}>DANH MỤC SẢN PHẨM</h3>
            <ul value={brand}>
              <li onClick={() => handleSelectChange("Asus")} value="Asus">
                ASUS
              </li>
              <li onClick={() => handleSelectChange("Dell")} value="Dell">
                DELL
              </li>
              <li onClick={() => handleSelectChange("Acer")} value="Acer">
                ACER
              </li>
              <li onClick={() => handleSelectChange("Lenovo")} value="Lenovo">
                LENOVO
              </li>
              <li onClick={() => handleSelectChange("")} value="">
                Tất cả
              </li>
            </ul>
          </div>
          <div className="gia">
            <h3 style={{ fontWeight: "bold" }}>LỌC THEO GIÁ</h3>

            <Form>
              {["radio"].map((type) => (
                <div key={`inline-${type}`} value={price} className="mb-3">
                  <Form.Check
                    className="check"
                    inline
                    label="Mặc định"
                    name="group1"
                    type={type}
                    value=""
                    id={`inline-${type}-1`}
                    onClick={sortPrice}
                  />
                  <br />
                  <Form.Check
                    className="check"
                    inline
                    label="Từ thấp đến cao"
                    name="group1"
                    type={type}
                    value="asc"
                    id={`inline-${type}-2`}
                    onClick={sortPrice}
                  />
                  <br />
                  <Form.Check
                    className="check"
                    inline
                    label="Từ cao đến thấp"
                    name="group1"
                    type={type}
                    value="desc"
                    id={`inline-${type}-3`}
                    onClick={sortPrice}
                  />
                </div>
              ))}
            </Form>
          </div>
        </div>
        {loading === false ? (
          <div className="right">
            {brand === "" ? <h1>Tất cả Sản phẩm</h1> : <h1>{brand}</h1>}
            <div className="body">
              <div className="d-flex flex-wrap list-products justify-content-around">
                {loading === false && list.length > 0 ? (
                  list.map((item) => <Card product={item} key={item.id} />)
                ) : (
                  <div className="text-center">
                    {/* <img src={require('../../assets/imgs/1.jpg')} style={{width:70,height:70}} alt="" /> */}
                    {/* <Spinner animation="border" variant="danger" /> */}

                    <h1 style={{ textAlign: "center" }}>
                      Không tìm thấy sản phẩm nào!!
                    </h1>
                  </div>
                )}
              </div>
            </div>
            <div className="pagination">
              <ReactPaginate
                previousLabel={"<"}
                nextLabel={">"}
                breakLabel={"..."}
                breakClassName={"break-me"}
                pageCount={totalPage}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={(e) => handleChangePage(e.selected + 1)}
                containerClassName={"pagination"}
                subContainerClassName={"pages pagination"}
                activeClassName={"active"}
              />
            </div>
          </div>
        ) : (
          <div
            className="text-center"
            style={{ marginTop: 200, marginLeft: 600 }}
          >
            <Spinner animation="border" variant="danger" />
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
