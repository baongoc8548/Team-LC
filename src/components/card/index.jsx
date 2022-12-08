import React from 'react'
import './styles.scss'
import { Button } from 'react-bootstrap'
import { Icon } from 'semantic-ui-react'
import { useNavigate } from "react-router-dom";
export default function Card({product}) {
  const navigate=useNavigate();
  return (
    <div className="card-container">
        <img src={product.images[0]}alt="" className='img' />
        <p className="d-flex" style={{paddingTop:20, fontSize:23,fontWeight:'bolder', color: 'rgb(200, 200, 200)'}}>{product.brand}<span className="ml-1 text-success font-weight-bold"></span> </p>
      <h5 className="name">{product.name}</h5>
      <p className="email d-flex"><span className="ml-1 text-danger font-weight-bold " style={{fontSize:23,fontWeight:'bolder' }}>{product.price} VND</span></p>
       <Button className="custom-btn btn-3" onClick={()=>{navigate(`/product/${product._id}`,{state:{id: product._id,brand:product.brand}})}}>
        <span>
          Xem chi tiết
        </span>
      </Button>
    </div>
  )
}
