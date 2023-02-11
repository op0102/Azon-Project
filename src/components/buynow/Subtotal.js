import React, { useState, useEffect,useContext } from 'react';
import "./buynow.css";





const Subtotal = ({ items }) => {




  const [price, setPrice] = useState(0);


  const totalAmount = () => {
    let itemPrice = 0;
    items.map((item) => {
      itemPrice += item.price.cost
    });
    setPrice(itemPrice);
  };

  useEffect(() => {
    totalAmount();

  }, [items]);

  return (
    <div className='sub_item'>
      <h3>Subtotal ({items.length} items) : <strong style={{ fontWeight: 700, color: "#111" }}>₹{price}.00 </strong> </h3>
    </div>
  )
}

export default Subtotal;