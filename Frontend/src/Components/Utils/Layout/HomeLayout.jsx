import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../../Navbar'
import Logo from '../../Logo'

const Home = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  )
}

export default Home