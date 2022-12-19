import React from "react";
import { useNavigate } from "react-router-dom";
import iconCart from "../../assets/imgs/cart1.png";
import iconHistory from "../../assets/imgs/history.png";
import "./styles.scss";

const MyCartIcon = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div
        to="/myCarts"
        className="myCart"
        onClick={() => navigate("/myCarts")}
      >
        <img src={iconCart} alt="" width={40} height={40} />
      </div>
      <div className="myHis" onClick={() => navigate("/myHistory")}>
        <img src={iconHistory} alt="" width={40} height={40} />
      </div>
    </div>
  );
};

export default MyCartIcon;