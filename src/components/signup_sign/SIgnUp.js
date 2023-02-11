import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SIgnUp = () => {

    const [udata, setUdata] = useState({
        email: "",
        password: "",
        cpassword: "",
        number: "",
        fname: ""

    });

    const addData = (e) => {
        const { name, value } = e.target;
        // console.log(e.target.value);
        setUdata(() => {
            return { ...udata, [name]: value }
        });
    }

    const sendata = async (e) => {
        e.preventDefault();
        const { fname, email, password, cpassword, number } = udata;
        try {

        const res = await axios.post("/register", {
            fname, email, password, cpassword, number
        })

        if (res.statusCode === 422 || !res) {
            toast.error("▲ Invalid Details!", {
                position: "top-center",
                autoClose: 2000,
            });
        } else {
            setUdata({
                fname: "", email: "",
                number: "", password: "", cpassword: ""
            });
            toast.success("Registration Successfully done 😃!", {
                position: "top-center",
                autoClose: 2000,
            });
            console.log("registration success!")
        }
    } catch (error) {
        
        console.log("front end ka catch error hai" + error.message);
    }
}




    











    return (
        <>
            <section>
                <div className='sign_container'>
                    <div className='sign_header'>
                        <NavLink to="/">
                            <img src='https://img.etimg.com/thumb/msid-59738992,width-640,resizemode-4,imgsize-25499/amazon.jpg' alt="amazonlogo" /></NavLink>
                    </div>

                    <div className='sign_form' >
                        <form method='POST'>

                            <h1>Sign-Up</h1>
                            <div className='form_data'>
                                <label htmlFor='fname'>Your name</label>
                                <input type='text'
                                    name="fname" id="fname"
                                    onChange={addData}
                                    value={udata.fname} />
                            </div>

                            <div className='form_data'>
                                <label htmlFor='email'>Email</label>
                                <input type='text'
                                    name="email" id="email"
                                    onChange={addData}
                                    value={udata.email} />
                            </div>

                            <div className='form_data'>
                                <label htmlFor='number'>Mobile Number</label>
                                <input type='text'
                                    name="number" id="number"
                                    onChange={addData}
                                    value={udata.number} />
                            </div>

                            <div className='form_data'>
                                <label htmlFor='password'>Password</label>
                                <input type='password'
                                    name="password" id="password"
                                    placeholder='at least 6 char'
                                    onChange={addData}
                                    value={udata.password} />
                            </div>

                            <div className='form_data'>
                                <label htmlFor='cpassword'>Password Again</label>
                                <input type='password'
                                    name="cpassword" id="cpassword"
                                    onChange={addData}
                                    value={udata.cpassword} />
                            </div>

                            <button className='signin_btn' onClick={sendata}>continue</button>

                            <div className='signin_info'>
                                <p>Already have an account? <NavLink to="/login">Sign in</NavLink></p>

                            </div>

                        </form>
                        <ToastContainer />
                    </div>



                </div>
            </section>
        </>
    )
}

export default SIgnUp