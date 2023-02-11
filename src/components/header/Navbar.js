import React, { useContext, useEffect, useState } from 'react';
import "./navbar.css";
import SearchIcon from '@mui/icons-material/Search';
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Avatar from '@mui/material/Avatar';
import { NavLink, useNavigate } from 'react-router-dom';
import { LoginContext } from '../contex/ContextProvider';
import axios from "axios";
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import Rightheader from './Rightheader';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import LogoutIcon from '@mui/icons-material/Logout';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';


const Navbar = () => {
    const { account, setAccount } = useContext(LoginContext);
    const { products } = useSelector(state => state.getproductsdata);

    const history = useNavigate();

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const [dropen, setDropen] = useState(false);

    const getdetailvalidUser = async () => {
        const res = await axios.get("/validuser", { withCredentials: true });

        if (res.status !== 201) {
            console.log("first login");
        } else {
            // console.log("cart add ho gya hain");
            setAccount(res);
        }
    }




    const handleOpen = () => {
        setDropen(!dropen);
    }

    const handleClosed = () => {
        setDropen(!dropen);
    }

    const [text, setText] = useState("");
    console.log(text);
    const [liopen, setLiopen] = useState(true);

    const logoutUser = async () => {
        const res = await axios.get("/logout", { withCredentials: true });

        if (res.status === 201 || res.status === 401) {
            history("/")
            setAccount("");
            toast.success("logout success 😃!", {
                position: "top-center",
                autoClose: 2000,
            });
            console.log("logout success!")

        } else {
            console.log("first login");
            history("/login")

        }
    };

    const getText = (items) => {
        setText(items)
        setLiopen(false);

    }



    useEffect(() => {
        getdetailvalidUser();
    }, []);

    return (
        <header>

            <nav>

                <IconButton className='hamburgur' onClick={handleOpen}>
                    <MenuIcon style={{ color: "white" }} />
                </IconButton>

                <Drawer open={dropen} onClick={handleClosed}>
                    <Rightheader Logoutuser={logoutUser} />
                </Drawer>







                <div className='left'>
                    <div className='navlogo'><NavLink to="/">
                        <img src='https://pngimg.com/uploads/amazon/amazon_PNG11.png' alt='' /></NavLink>
                    </div>
                    <div className="nav_searchbaar" >
                        <input type="text" name="" placeholder='Search Product' onChange={(e) => getText(e.target.value)} />
                        <div className='search_icon'>
                            <SearchIcon id="search" />
                        </div>

                        {/* search filter */}

                        {text &&
                            <List className='extrasearch' hidden={liopen}>

                                {
                                    products.filter(product => product.title.longTitle.toLowerCase().includes(text.toLowerCase())).map(product => (
                                        <ListItem>
                                            {/* <NavLink to= `/getproductsone/${product.id}` > */}
                                            <NavLink to={`/getproductsone/${product.id}`} onClick={() => setLiopen(true)}>
                                                {product.title.longTitle}
                                            </NavLink>



                                        </ListItem>
                                    ))

                                }

                            </List>
                        }





                    </div>

                </div>

                <div className='right'>
                    <div className='nav_btn'>
                        {account ? <h3> {account.data.fname.toUpperCase()}</h3> : <NavLink to="/login">Sign In</NavLink>}

                    </div>
                    <div className='cart_btn'>
                        {account ?
                            <NavLink to="/buynow">
                                <Badge badgeContent={account.data.carts.length} color="primary">
                                    <ShoppingCartIcon id="icon" />
                                </Badge>

                            </NavLink> : <NavLink to="/buynow"> <Badge badgeContent={0} color="primary">
                                <ShoppingCartIcon id="icon" />
                            </Badge> </NavLink>
                        }
                        <NavLink to="/buynow">   <p>Cart</p></NavLink>
                    </div>
                    {account ? <Avatar className='avtar2' id="basic-button"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}>

                        {account.data.fname[0].toUpperCase()}
                    </Avatar> : <Avatar className='avtar' id="basic-button"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick} />

                    }

                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                    >
                        <NavLink to="/" style={{ textDecoration: "none", color: "#131921" }}>
                            <MenuItem onClick={handleClose}>My account</MenuItem>
                        </NavLink>
                        {account ?
                            <MenuItem onClick={() => { handleClose(); logoutUser(); }} style={{ margin: 10 }} >
                                <LogoutIcon style={{ fontSize: 18, marginRight: 3 }} />
                                Logout
                            </MenuItem>
                            : ""
                        }

                    </Menu>





                </div>




            </nav>

            <ToastContainer />
        </header>
    )
}

export default Navbar;