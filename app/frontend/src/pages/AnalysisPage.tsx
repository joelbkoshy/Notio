import React, { useEffect } from 'react'
import SideBar from '../components/SideBar'
import './style.css'
import { useSidebar } from '../context/SideBarContext.js';
import YouTube from '../components/YouTube'
import Home from '../components/Home'

const AnalysisPage = () => {

  const {sidebarItem} = useSidebar();
  useEffect(()=>{

    console.log("reloaded")
  },[sidebarItem])
  return (
    <div className='analysis-mainContainer'>
      <div>
      <SideBar/>
      </div>
      <div className='analysis-content'>
        {
          sidebarItem ===  'youtube' ?
          <YouTube/>
          :
          <Home/>
        }
      </div>
    </div>
  )
}

export default AnalysisPage