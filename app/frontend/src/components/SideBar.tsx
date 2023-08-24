// SideBar.js
import React from 'react';
import { useSidebar } from '../context/SideBarContext.js'; 
import home from '../Assets/home.png';
import youtube from '../Assets/youtube.png';

const SideBar = () => {
  const { setSidebarItem } = useSidebar();

  return (
    <div className='sidebar'>
      <div className='sidebar-content'>
        <div className='sidebar-h3'>
          <h3 style={{ color: '#fffdfd' }}>N</h3>
        </div>
        <div className='sidebar-logos'>
          <button
            onClick={() => setSidebarItem('home')}
            className='sidebar-buttons'
          >
            <img src={home} alt="" className='sidebar-images' />
          </button>
          <button
            onClick={() => setSidebarItem('youtube')}
            className='sidebar-buttons'
          >
            <img src={youtube} alt="" className='sidebar-images' />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
