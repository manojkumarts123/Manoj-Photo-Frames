import React from 'react'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div className='bg-red-100 min-h-[calc(100svh-50px)] px-6 mobile:px-16'>
        <Outlet />
    </div>
  )
}

export default Layout