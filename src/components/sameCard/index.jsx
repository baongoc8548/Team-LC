import React from 'react'
import './styles.scss'
import { useNavigate } from "react-router-dom";

export default function SameCard({product}) {
    const navigate = useNavigate();

  // const moveToDetail = () => {
  //   navigate(`/product/${product._id}`,{state:{id: product._id,brand:product.brand}})
  // };
  return (
    <div
      className="cardItem-container"
      onClick={()=>{navigate(`/product/${product._id}`,{state:{id: product._id,brand:product.brand}})}}
      title={product?.name}
    >
      <img className="image" src={product?.images[0]} alt='' />
      <h4 className="name">{product?.name}</h4>
      <p className="price-text">{product?.price} VND</p>
    </div>
  )
}
