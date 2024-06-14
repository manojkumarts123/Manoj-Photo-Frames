import { Children, useState } from 'react'
import { createBrowserRouter, RouterProvider, Outlet, json } from 'react-router-dom'
import axios from 'axios'
import useSWR from 'swr'

import Layout from './Components/Utils/Layout/Layout'
import HomeLayout from './Components/Utils/Layout/HomeLayout'
import HomePage from './Components/HomePage'
import Errorpage from './Components/Errorpage'
import Login from './Components/Auth/Login'
import Signup from './Components/Auth/Signup'
import CustomerDashboard from './Components/Customer/Dashboard'

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: "/user",
        element: <Layout />,
        children: [
          {
            path: "login",
            element: <Login />,
          },
          {
            path: "signup",
            element: <Signup />
          }
        ]
      },
      {
        path: "api/v1/customer",
        children: [
          {
            path: "dashboard",
            element: <CustomerDashboard />
          }
        ]
      },
      {
        path: "api/v1/admin",
      }
    ]
  }
])

function App() {
  return (
    <RouterProvider router={router} />
    // <h1 className="text-3xl font-bold underline">Manoj</h1>
  )
}

export default App
