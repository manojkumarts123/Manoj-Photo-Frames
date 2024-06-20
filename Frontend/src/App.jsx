import { useState, useEffect } from 'react'
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
import { CurrentUser } from './Components/Utils/Contexts'

function App() {
    const [currentUser, setCurrentUser] = useState(null)

    useEffect(()=> {
        const currentUser = localStorage.getItem('currentUser')
        if(currentUser){
            setCurrentUser(JSON.parse(currentUser))
        }
    }, [])

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
                    element: <Layout bgColor='light' backdrop={'1-light'} />,
                    children: [
                        {
                            path: "login",
                            element: <Login setCurrentUser={setCurrentUser} />,
                        },
                        {
                            path: "signup",
                            element: <Signup />
                        }
                    ]
                },
                {
                    path: "api/v1/customer",
                    element: <Layout bgColor='dark' backdrop={'1-dark'} />,
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

    return (
        <CurrentUser.Provider value={currentUser}>
            <RouterProvider router={router} />
        </CurrentUser.Provider>
    )
}

export default App
