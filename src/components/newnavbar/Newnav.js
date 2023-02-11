import React from 'react';
import "./newnav.css";

const Newnav = () => {
  return (
    <div className='new_nav'>
        <div className='nav_data'>
            <div className='left_data'>
                <p>All</p>
                <p>Mobiles</p>
                <p>BestSeller</p>
                <p>Fashion</p>
                <p>Customer Services</p>
                <p>Electronics</p>
                <p>Prime</p>
                <p>Today's Deal</p>
                <p>Amazon Pay</p>



            </div>

            <div className='right_data'>
                <img src='https://m.media-amazon.com/images/G/31/IN-hq/2021/img/Mobile_Traffic_/XCM_Manual_1321458_1651511_IN_3781247_400x39_en_IN._CB655944656_.jpg' alt='navdata' />

            </div>

        </div>
    </div>
  )
}

export default Newnav