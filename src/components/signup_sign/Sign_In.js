import React, { useState ,useContext} from 'react';
import "./signup.css";
import { NavLink, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { LoginContext } from '../contex/ContextProvider';

const Sign_In = () => {

  const { account, setAccount } = useContext(LoginContext);
  const history = useNavigate();


  const [data, setData] = useState({
    email: "",
    password: ""

  });

  const addData = (e) => {
    const { name, value } = e.target;

    setData(() => {
      return { ...data, [name]: value }
    });
 

  }

  const sendData = async (e) => {
    e.preventDefault();
    const { email, password } = data;

    if (email === "") {
      return toast.warn("empty email!", {
        position: "top-center",
        autoClose: 2000,
      });
    }
    if (password === "") {
      return toast.warn("empty password!", {
        position: "top-center",
        autoClose: 2000,
      });
    } else {


      try {

        const res = await axios.post("/login", { email, password });
        // console.log(res);


        if (res.status === 400 || !res) {
           toast.error("▲ Invalid Details!", {
            position: "top-center",
            autoClose: 2000,
          });

        } else {
          setAccount(res);
          setData({ email: "", password: "" });
          toast.success("Login Success 😃!", {
            position: "top-center",
            autoClose: 2000,
          });
          console.log("login success!")
          history("/")
        }

      } catch (error) {
        console.log("front end ka catch error hai" + error.message);
      }


    }
  }





  return (
    <>
      <section>
        <div className='sign_container'>
          <div className='sign_header'>
            <NavLink to="/">
              <img src='https://img.etimg.com/thumb/msid-59738992,width-640,resizemode-4,imgsize-25499/amazon.jpg' alt="amazonlogo" />
            </NavLink>
          </div>

          <div className='sign_form' >
            <form method='POST'>

              <h1>Sign-In</h1>
              <div className='form_data'>
                <label htmlFor='email'>Email</label>
                <input type='text'
                  name="email" id="email"
                  onChange={addData}
                  value={data.email}
                />
              </div>

              <div className='form_data'>
                <label htmlFor='password'>Password</label>
                <input type='password' name="password" id="password" onChange={addData}
                  value={data.password}
                />
              </div>
              <button className='signin_btn' onClick={sendData}>continue</button>

            </form>
          </div>

          <div className='create_accountinfo'>
            <p>New To Amazon?</p><NavLink to="/register">
              <button>Create Your amazon account</button></NavLink>
          </div>
          <ToastContainer />
        </div>
      </section>
    </>

  )
}

export default Sign_In;





