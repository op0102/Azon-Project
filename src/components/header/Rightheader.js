import React, { useContext } from 'react';
import Avatar from '@mui/material/Avatar';
import { LoginContext } from '../contex/ContextProvider';
import { NavLink } from 'react-router-dom';
import { Divider } from '@mui/material';
import "./rightheader.css";
import LogoutIcon from '@mui/icons-material/Logout';



const Rightheader = ({Logoutuser}) => {

    const { account, setAccount } = useContext(LoginContext);





    return (
        <>
            <div className='rightheader'>

                <div className='right_nav'>
                    {account ? <Avatar className='avtar2'>
                        {account.data.fname[0].toUpperCase()}
                    </Avatar> : <Avatar className='avtar' />
                    }

                    {account ? <h3> {account.data.fname.toUpperCase()}</h3> : ""}
                </div>

                <div className='nav_btn'>

                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/">Shop By Category</NavLink>

                    <Divider style={{ width: "100%", marginLeft: "-20px" }} />

                    <NavLink to="/">Today's Deal</NavLink>

                    {account ?
                        <NavLink to="/buynow">Your Order</NavLink>
                        :
                        <NavLink to="/login">Your Order</NavLink>
                    }

                    <Divider style={{ width: "100%", marginLeft: "-20px" }} />

                    <div className='flag'>
                        <NavLink to="/">Settings</NavLink>
                        <img src='https://upload.wikimedia.org/wikipedia/en/thumb/4/41/Flag_of_India.svg/1200px-Flag_of_India.svg.png' alt="" 
                        style={{ width: "45px", height: "30px", marginLeft: "8px",marginBottom:"-2px" }} />
                    </div>

                    {account ? <div className='flag1' onClick={()=>Logoutuser()} >
                        <LogoutIcon style={{ fontSize: 18, marginRight: 4 }} />
                        <h3 style={{cursor:"pointer", fontWeight:500}}>Logout</h3></div>
                        :
                        <NavLink to="/login">Sign In</NavLink>
                    }



                    </div>


            </div>

            </>
            )
}

            export default Rightheader