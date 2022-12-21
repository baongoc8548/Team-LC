import React, { useState, useEffect } from "react";
import "./styles.scss";
import Navbar from "../../components/navbar";
import { Button, Spinner } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Modal from "react-bootstrap/Modal";
import MyCartIcon from "../../components/MyCartAndHistory";
import SameCard from "../../components/sameCard";
import Footer from "../../components/footer";

export default function ProductDetail() {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  const { state } = useLocation();
  // console.log("product Id: ", state.id);
  // console.log("product Brand: ", state.brand);
  const [productsBrand, setProductsBrand] = useState();
  const [product, setProduct] = useState();
  const [image, setImage] = useState();
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const isLogin = localStorage.getItem("customerName");
  const [message, setMessage] = useState();
  const userId = localStorage.getItem("userId");
  const [modalShow, setModalShow] = useState(false);
  const [modalConfirm, setModalConfirm] = useState(false);
  const customerName = localStorage.getItem("customerName");
  const getProductId = () => {
    setLoading(true);
    axios
      .get(
        `https://lapcenter-v1.onrender.com/api/product/getProductById/${state.id}`
      )
      .then(function (response) {
        // handle success
        const data = response.data.response;
        console.log("SUCCESS: ", data);
        setProduct(data);
        setLoading(false);
        setImage(data.images[0]);
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
  useEffect(() => {
    //hàm này chạy đầu tiên , nếu [] để rỗng
    //hàm này sẽ chạy khi dữ liêu abc hoặc def trong [abc,def] có sự thay đổi
    getProductId();
    getProductsBrand();
  }, [location]);
  const getProductsBrand = () => {
    setLoading(true);

    axios
      .get("https://lapcenter-v1.onrender.com/api/product", {
        params: {
          productBrand: state.brand,
        },
      })
      .then(function (response) {
        // handle success
        console.log("SUCCESS 1: ", response.data);
        setProductsBrand(response.data.products);
        setLoading(false);
      })
      .catch(function (error) {
        // handle error
        console.log("ERROR 2: ", error);
        setLoading(false);
        alert("Something went wrong!!!");
      })
      .then(function () {
        // always executed
      });
  };
  const handleAddToCart = () => {
    setLoading(true);
    axios
      .post("https://lapcenter-v1.onrender.com/api/cart/addProductToCart", {
        userId: userId,
        productId: state.id,
        productName: product.name,
        productBrand: product.brand,
        image: image,
        price: product.price,
      })
      .then((res) => {
        // alert("Tạo đơn hàng thành công!!");
        setModalConfirm(true);
        console.log("success");
        setMessage("Thêm sản phẩm vào giỏ hàng thành công!");
        setLoading(false);
      })
      .catch((err) => {
        setModalConfirm(true);
        setMessage("Thêm sản phẩm vào giỏ hàng thất bại!");
        setLoading(false);
      });
    setModalShow(false);
  };
  return (
    <>
      <Navbar />
      {customerName && <MyCartIcon />}
      <div className="productDetailContainer">
        {loading === false ? (
          <div>
            <div className="tittle"></div>
            <hr />
            <div className="info row">
              <div className="productImg col">
                <img src={image} alt="" className="image" />
                <div className="text-center" style={{ marginRight: 200 }}>
                  {product?.images.length > 0 &&
                    product?.images.map((item, idx) => (
                      <img
                        src={item}
                        alt=""
                        className="imgSmall "
                        key={idx}
                        onClick={() => setImage(item)}
                      />
                    ))}
                </div>
              </div>
              <div className="price col" style={{ width: 200 }}>
                {/* <span className="price1" style={{sontSize}}>Ơ</span>{" "} */}
                <h1>{product?.name}</h1>
                <span className="amount" style={{ fontSize: 40 }}>
                  {product?.price} VND
                </span>
                <br />
                <b>Tình trạng : </b>còn hàng
                <br />
                <b className="">Bảo hành : </b>24 tháng
                <br />
                <b>Hãng : </b>
                {product?.brand}
                <br />
                <br />
                <div className="gift">Khuyến mãi -Quà tặng</div>
                <div className="giftInfo">
                  {/* <p>-Tặng 02 suất mua Dây đồng hồ giảm ngay 50%. (Không áp dụng KM khác)</p> */}
                  <span>
                    <i
                      class="bi bi-patch-check"
                      style={{ color: "red", paddingRight: 20, fontSize: 30 }}
                    ></i>
                    Giảm 40% khi mua kèm (không áp dụng thêm khuyến mãi khác)
                  </span>
                  <br />
                  <span>
                    <i
                      class="bi bi-gift-fill"
                      style={{ color: "red", paddingRight: 20, fontSize: 30 }}
                    ></i>
                    Tặng 100.000₫ mua hàng tại website và là thành viên LC, áp
                    dụng khi mua Online tại Đà Nẵng và 1 số khu vực khác
                  </span>
                </div>
                <div className="text-center">
                  <Button
                    className="my-4 bg-danger"
                    onClick={() => {
                      navigate(`/buy/${product._id}`, {
                        state: { id: product._id },
                      });
                    }}
                  >
                    Mua ngay
                  </Button>
                  <br />
                  {isLogin && (
                    <Button className="bg-success" onClick={handleAddToCart}>
                      Thêm vào giỏ hàng
                    </Button>
                  )}
                  <br />
                  <span>
                    GỌI NGAY{" "}
                    <span className="text-danger mx-2 h4"> 0777373737</span> ĐỂ
                    GIỮ HÀNG
                  </span>
                </div>
              </div>
            </div>
            <hr />
            <table class="table my-5 table-striped table-hover">
              <thead>
                <tr>
                  <th scope="col">Phần cứng</th>
                  <th scope="col">Thông số kĩ thuật</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Model</td>
                  <td>{product?.model}</td>
                </tr>
                <tr>
                  <td>CPU</td>
                  <td>{product?.cpu}</td>
                </tr>
                <tr>
                  <td>Ram</td>
                  <td>{product?.ram}</td>
                </tr>
                <tr>
                  <td> Ổ cứng</td>
                  <td>{product?.disk}</td>
                </tr>
                <tr>
                  <td>Card đồ họa</td>
                  <td>{product?.card}</td>
                </tr>
                <tr>
                  <td>Màn hình</td>
                  <td>{product?.monitor}</td>
                </tr>
              </tbody>
            </table>
            <p class="text-danger h3">SẢN PHẨM CÙNG THƯƠNG HIỆU</p>
            <hr />
            <Carousel responsive={responsive}>
              {productsBrand?.length > 0 &&
                productsBrand?.map((item, index) => (
                  <SameCard product={item} key={index} />
                ))}
            </Carousel>
            ;
          </div>
        ) : (
          <div className="text-center" style={{ marginTop: 200 }}>
            <Spinner animation="border" variant="danger" />
          </div>
        )}
         <Modal
          show={modalConfirm}
          onHide={() => setModalConfirm(false)}
          size="md"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Thông báo
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>{message}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => setModalConfirm(false)}>Đóng</Button>
          </Modal.Footer>
        </Modal>
      </div>
      {loading && <div style={{ marginTop: "370px" }} />}
      <Footer/>
    </>
  );
}
