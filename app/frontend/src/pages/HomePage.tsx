import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';

import Type from '../components/Type';
import ImageSwitcher from '../components/ImageSwitcher';


const HomePage = () => {

  const navigate=useNavigate();


  return (
    <div className='home-main'>
      {/* <SideBar /> */}
      <div className='image-switcher-container'>
        <h1>Notio</h1>
        <ImageSwitcher />
      </div>
      <div className='content-container'>
        <div className='home-main-content'>
          <div className='TypeWriter'>
            <Type />
          </div>
          <div className='content'>
            <div className='header'>
              <div className='get-started-container'>
                <button className='get-started' onClick={()=>navigate("/main")}>Get Started</button>
              </div>
            </div>
            <>
              {/* < BarChart data={[{label:"hi",value:10}]} /> */}
            </>

          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
