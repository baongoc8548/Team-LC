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
    //h??m n??y ch???y ?????u ti??n , n???u [] ????? r???ng
    //h??m n??y s??? ch???y khi d??? li??u abc ho???c def trong [abc,def] c?? s??? thay ?????i
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
        // alert("T???o ????n h??ng th??nh c??ng!!");
        setModalConfirm(true);
        console.log("success");
        setMessage("Th??m s???n ph???m v??o gi??? h??ng th??nh c??ng!");
        setLoading(false);
      })
      .catch((err) => {
        setModalConfirm(true);
        setMessage("Th??m s???n ph???m v??o gi??? h??ng th???t b???i!");
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
                {/* <span className="price1" style={{sontSize}}>??</span>{" "} */}
                <h1>{product?.name}</h1>
                <span className="amount" style={{ fontSize: 40 }}>
                  {product?.price} VND
                </span>
                <br />
                <b>T??nh tr???ng : </b>c??n h??ng
                <br />
                <b className="">B???o h??nh : </b>24 th??ng
                <br />
                <b>H??ng : </b>
                {product?.brand}
                <br />
                <br />
                <div className="gift">Khuy???n m??i -Qu?? t???ng</div>
                <div className="giftInfo">
                  {/* <p>-T???ng 02 su???t mua D??y ?????ng h??? gi???m ngay 50%. (Kh??ng ??p d???ng KM kh??c)</p> */}
                  <span>
                    <i
                      class="bi bi-patch-check"
                      style={{ color: "red", paddingRight: 20, fontSize: 30 }}
                    ></i>
                    Gi???m 40% khi mua k??m (kh??ng ??p d???ng th??m khuy???n m??i kh??c)
                  </span>
                  <br />
                  <span>
                    <i
                      class="bi bi-gift-fill"
                      style={{ color: "red", paddingRight: 20, fontSize: 30 }}
                    ></i>
                    T???ng 100.000??? mua h??ng t???i website v?? l?? th??nh vi??n LC, ??p
                    d???ng khi mua Online t???i ???? N???ng v?? 1 s??? khu v???c kh??c
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
                      Th??m v??o gi??? h??ng
                    </Button>
                  )}
                  <br />
                  <span>
                    G???I NGAY{" "}
                    <span className="text-danger mx-2 h4"> 0777373737</span> ?????
                    GI??? H??NG
                  </span>
                </div>
              </div>
            </div>
            <hr />
            <table class="table my-5 table-striped table-hover">
              <thead>
                <tr>
                  <th scope="col">Ph???n c???ng</th>
                  <th scope="col">Th??ng s??? k?? thu???t</th>
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
                  <td> ??? c???ng</td>
                  <td>{product?.disk}</td>
                </tr>
                <tr>
                  <td>Card ????? h???a</td>
                  <td>{product?.card}</td>
                </tr>
                <tr>
                  <td>M??n h??nh</td>
                  <td>{product?.monitor}</td>
                </tr>
              </tbody>
            </table>
            <p class="text-danger h3">S???N PH???M C??NG TH????NG HI???U</p>
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
              Th??ng b??o
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>{message}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => setModalConfirm(false)}>????ng</Button>
          </Modal.Footer>
        </Modal>
      </div>
      {loading && <div style={{ marginTop: "370px" }} />}
      <Footer/>
    </>
  );
}
