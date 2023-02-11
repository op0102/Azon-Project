import React, { useEffect, useState, useContext } from 'react';
import { Divider } from "@mui/material";
import "./cart.css";
import { NavLink, useParams } from 'react-router-dom';
import axios from "axios";
import { LoginContext } from '../contex/ContextProvider';



const Cart = () => {

    const { id } = useParams("");
    // const history = useNavigate("");
    const [loading, setLoading] = useState(false);


    const { account, setAccount } = useContext(LoginContext);


    const [inddata, setInddata] = useState("");

    const getIndividualData = async () => {
        try {
            const res = await axios.get(`/getproductsone/${id}`, { withCredentials: true });


            if (res.status !== 201) {
                console.log("No data available !!");
            } else {
                console.log("getData success !!");
                setInddata(res);


            }
        } catch (error) {
            console.log(`getIndividualData error in Cart folder cart.js ${error.message}`)

        }
    };


    useEffect(() => {
        getIndividualData();
    }, [id]);

    // add cart function
    const addtocart = async (id) => {
        setLoading(true);

        const senData = inddata.data;

        const checkres = await axios.post(`/addcart/${id}`, { data:{senData} },
            { withCredentials: true });




        if (checkres.status === 401 || !checkres) {
            setLoading(false);
            console.log('user invalid!')

        } else {
            // history("/buynow")
            setAccount(checkres);
            setLoading(false);
            console.log("item added!");



        }
    };



    return (<>



        <div className='cart_section'>
            {inddata.data && Object.keys(inddata.data).length &&


                <div className='cart_container'>
                    <div className='left_cart'>

                        <img
                            src={inddata.data.url} alt="cart_img" />
                        <div className='cart_btn'>
                            <button className='cart_btn1' onClick={() => addtocart(inddata.data.id)}>Add to Cart</button>
                            <NavLink to="/buynow">
                                <button className='cart_btn2'>Buy Now</button>
                            </NavLink>
                        </div>
                    </div>

                    <div className='right_cart'>
                        <h3>{inddata.data.title.shortTitle}</h3>
                        <h4>
                            {inddata.data.title.longTitle}
                        </h4>
                        <Divider />
                        <p className='MRP'>M.R.P : ₹{inddata.data.price.mrp} </p>
                        <p>Deal of the day : <span style={{ color: "#B12704" }}>₹{inddata.data.price.cost}</span></p>
                        <p>You save : <span style={{ color: "#B12704" }}>₹{inddata.data.price.mrp - inddata.data.price.cost} ({inddata.data.price.discount})</span></p>

                        <div className='discount_box'>
                            <h5>Discount : <span style={{ color: "#111" }}>{inddata.data.discount}</span></h5>
                            <h4>Free Delivery : <span style={{ color: "#111", fontWeight: 600 }}>Oct 8 - 21 </span>Details</h4>
                            <p>Fastest Delivery : <span style={{ color: "#111" }}>Tomorrow 11AM</span></p>
                        </div>
                        <p className='description'>About the Item : <span style={{ color: "#465959", fontSize: "14px", fontWeight: 500, letterSpacing: "0.4px" }}>{inddata.data.description}</span></p>


                    </div>

                </div>}
        </div>





    </>
    )
}

export default Cart;















