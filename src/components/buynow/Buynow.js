import { Divider } from '@mui/material';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import "./buynow.css";
import Option from './Option';
import Right from './Right';
import Subtotal from './Subtotal';
import Empty from './Empty';


const Buynow = () => {
    const [cartdata, setCartdata] = useState("");

    const [loading, setLoading] = useState(false);


    const getdatabuy = async () => {

        setLoading(true);
        const res = await axios.get("/cartdetails", { withCredentials: true });

        if (res.status === 201) {
            setLoading(false);
            setCartdata(res.data.carts);
            // console.log(res.data.carts);
        } else {
            setLoading(false);
            console.log("your cart is empty!")

        }
        setLoading(false);
    };

    useEffect(() => {
        getdatabuy();
    }, []);







    return (
        <>


            {cartdata.length ?
                <div className='buynow_section'>
                    <div className='buynow_container'>
                        <div className='left_buy'>
                            <h1>Shopping Cart</h1>
                            <p>Select all items</p>
                            <span className='leftbuyprice'>Price</span>
                            <Divider />

                            {
                                cartdata.map((e, k) => {
                                    return (
                                        <>
                                            <div className='item_containert' key={k}>
                                                <img src={e.detailUrl} alt="" />
                                                <div className='item_details'>
                                                    <h3>{e.title.longTitle}</h3>
                                                    <h3>{e.title.shortTitle}</h3>
                                                    <h3 className='diffrentprice'>
                                                        ₹4049.00
                                                    </h3>
                                                    <p className='unusuall'>Usually dispatched in 8 days</p>
                                                    <p>Eligible for Free Shipping</p>
                                                    <img src="https://m.media-amazon.com/images/G/31/marketing/fba/fba-badge_18px-2x._CB485942108_.png" alt="logo" />
                                                    <Option deleteProduct={e.id} get={getdatabuy} />
                                                </div>
                                                <h3 className='item_price'>₹{e.price.cost}.00</h3>
                                            </div>
                                            <Divider />
                                        </>
                                    )
                                })
                            }

                            <Subtotal items={cartdata} />

                        </div>

                        <div className='right_buy'>
                            <Right items={cartdata} />

                        </div>

                    </div>
                </div>

                : <Empty />}
        </>

    )
}

export default Buynow;





