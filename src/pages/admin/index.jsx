import React from 'react'
import "./styles.scss";
import Navbar from "../../components/navbar";

export default function Admin() {

  return (
    <div className="container ">
<div className="top d-flex">
<p className='txtdx'>Quản Trị Viên</p>
<img
              src={require("../../assets/imgs/laptophouse4.png")}
              alt=""
              style={{width:500,height:150}}
            />
                
<p className='txtdx'>ĐĂNG XUẤT</p>
</div>
<div className="main d-flex">

      <div className="left custom-btn">
        <h3 style={{marginLeft:100,marginTop:10,color:" #306d78"}}>Danh Mục</h3>
        <p className='lefttxt mt'>Quản Lí Đơn Hàng</p>
        <p className='lefttxt' >Quản Lí Sản Phẩm</p>
        <p className='lefttxt'>Quản Lí Tài Khoản</p>
        <p className='lefttxt'>Quản Lí Đánh Giá</p>
        <p className='lefttxt'>Báo Cáo Thống Kê</p>
      </div>
      <div className="right"></div>

</div>
    </div>
  )
}
