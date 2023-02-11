import axios from 'axios';
import React, { useContext, useState, useEffect } from 'react';
import "./buynow.css";
import { LoginContext } from '../contex/ContextProvider';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Option = ({ deleteProduct, get }) => {
  const { account, setAccount } = useContext(LoginContext);

  const removeProduct = async (req, res) => {
    try {
      const res = await axios.delete(`/remove/${deleteProduct}`, { withCredentials: true });



      if (res.status === 400 || !res) {
        console.log("error!");

      } else {
        toast.success("product remove from cart!"
          , {
            position: "top-center",
            autoClose: 2000,
          });
        setAccount(res);
        get();
        console.log("product deleted!")

      }

    } catch (error) {
      console.log(error);
    }

  };

  return (
    <div className='add_remove_select'>
      <select>

        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>

      </select>
      <p style={{ cursor: "pointer" }} onClick={() => removeProduct(deleteProduct)}>Delete</p><span>|</span>
      <p className='forremovemedia'>Save or Later</p><span>|</span>
      <p className='forremovemedia'>See More Like This</p>

      <ToastContainer />
    </div>


  )
}

export default Option;
















