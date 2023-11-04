import React from 'react'
import Header from '../components/Header/Header'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <>    
    <div id='app-container' className='w-full h-full flex flex-col'>
        <Header />
        <div className='h-[calc(100vh-50px)]'>
            <Outlet />
        </div>
    </div>
    </>
  )
}

export default Layout