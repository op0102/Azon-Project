import React, { useState, useEffect } from 'react';
import "./buynow.css";

const Right = ({ items }) => {

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
        <div className='right_buy'>
            <img src="https://images-eu.ssl-images-amazon.com/images/G/31/checkout/assets/TM_desktop._CB443006202_.png" alt="rightimg" />
            <div className='cost_right'>
                <p>Your Order is eligible for Free Delivery</p><br />
                <span style={{ color: "#565959" }}>Select this option at checkout. Details</span>
                <h3>Subtotal ({items.length} items) : <span style={{ fontWeight: 700 }}>₹{price}.00</span></h3>
                <button className='rightbuy_btn'>Process to Buy</button>
                <div className='emi'>
                    Emi Available
                </div>
            </div>


        </div>
    )
}

export default Right