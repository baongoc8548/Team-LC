import React from "react";
import "./styles.scss";
export default function Footer() {
  return (
    <div className="footerContainer">
      <div className="content">
        <div className="general">
          <h5>Thông tin chung</h5>
          <ul>
            <li>Giới thiệu về công ty</li>
            <li>Tin tuyển dụng</li>
            <li>Liên hệ</li>
            <li>Góp ý</li>
          </ul>
        </div>
        <div className="branch">
          <h5>Chi nhánh</h5>
          <ul>
            <li>Đà nẵng : 123 Nguyễn văn linh</li>
            <li>Huế : 123 Lê Lợi</li>
            <li>Nha Trang : 456 Phan Châu Trinh</li>
          </ul>
        </div>
        <div className="contact">
          <h5>Kênh xã hội</h5>
          <ul>
            <li>Facebook</li>
            <li>Gmail</li>
            <li>Twitter</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
