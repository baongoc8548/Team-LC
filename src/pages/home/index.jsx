import React from "react";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import { Card, CardGroup } from "react-bootstrap";
import MyCartIcon from "../../components/MyCartAndHistory";
import "./styles.scss";
export default function Home() {
  const customerName = localStorage.getItem("customerName");

  return (
    <>
      <Navbar />
      {customerName && <MyCartIcon />}
      <div className="homeContainer">
        <div className="main">
          <div className="all d-flex ">
            <div className="card">
              <Card className="bg-dark text-white">
                <Card.Img
                  src={require("../../assets/imgs/gaming1.jpg")}
                  alt="Card image"
                  style={{ width: 650, height: 500, background: "black" }}
                />
                <Card.ImgOverlay>
                  <Card.Title style={{ fontSize: 30 }}>
                    Học Tập và Làm Việc
                  </Card.Title>
                </Card.ImgOverlay>
              </Card>
            </div>
            <div className="card">
              <Card className="bg-dark text-white">
                <Card.Img
                  src={require("../../assets/imgs/gaming6.jpg")}
                  alt="Card image"
                  style={{ width: 480, height: 500, background: "yellow" }}
                />
                <Card.ImgOverlay>
                  <Card.Title
                    style={{
                      fontSize: 25,
                      color: "black",
                      marginTop: 430,
                      textAlign: "center",
                    }}
                  >
                    Mỏng nhẹ, di chuyển nhiều
                  </Card.Title>
                </Card.ImgOverlay>
              </Card>
            </div>
            <div className="noflex">
              <div className="card">
                <Card className="bg-dark text-white">
                  <Card.Img
                    src={require("../../assets/imgs/gaming2.jpg")}
                    alt="Card image"
                    style={{ width: 400, height: 250, background: "red" }}
                  />
                  <Card.ImgOverlay>
                    <Card.Title>Chơi game</Card.Title>
                  </Card.ImgOverlay>
                </Card>
              </div>
              <div className="card">
                <Card className="bg-dark text-white">
                  <Card.Img
                    src={require("../../assets/imgs/Hinh-anh-may-tinh.jpg")}
                    alt="Card image"
                    style={{ width: 400, height: 250, background: "orange" }}
                  />
                  <Card.ImgOverlay>
                    <Card.Title
                      style={{ fontSize: 20, marginTop: 120, color: "black" }}
                    >
                      Đồ họa và kỹ thuật
                    </Card.Title>
                  </Card.ImgOverlay>
                </Card>
              </div>
            </div>
          </div>
        </div>
        <div className="middle flex">
          <div className="left">
            <h1>Top sản phẩm BÁN CHẠY</h1>
          </div>
          <div className="right">
            <CardGroup style={{ width: 1200, height: 400 }}>
              <Card className="img">
                <Card.Img
                  variant="top"
                  src={require("../../assets/imgs/gaming4.jpg")}
                  style={{ borderRadius: 40 }}
                />
                <Card.Body>
                  <Card.Title>Tên lap top</Card.Title>
                </Card.Body>
                <Card.Footer>
                  <small className="text-muted">Giá</small>
                </Card.Footer>
              </Card>
              <Card className="img">
                <Card.Img
                  variant="top"
                  src={require("../../assets/imgs/gaming4.jpg")}
                  style={{ borderRadius: 40 }}
                />
                <Card.Body>
                  <Card.Title>Tên laptop</Card.Title>
                </Card.Body>
                <Card.Footer>
                  <small className="text-muted">Giá</small>
                </Card.Footer>
              </Card>
              <Card className="img">
                <Card.Img
                  variant="top"
                  src={require("../../assets/imgs/gaming4.jpg")}
                  style={{ borderRadius: 40 }}
                />
                <Card.Body>
                  <Card.Title>Tên laptop</Card.Title>
                </Card.Body>
                <Card.Footer>
                  <small className="text-muted">Giá</small>
                </Card.Footer>
              </Card>
            </CardGroup>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
