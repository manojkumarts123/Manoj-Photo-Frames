import { useContext } from 'react'

import Logo from './Logo'
import { CurrentUser } from './Utils/Contexts'
import { ROLES } from '../constants'

const Navbar = () => {
    const currentUser = useContext(CurrentUser)
    
    return (
        <>
            <div className='bg-red-900 flex items-center h-[50px] px-6 py-2 border-solid border-red-100 border-b mobile:px-16'>
                <div className='w-1/6'>
                    <Logo width='40' heigth='40' />
                </div>
                <div className='w-4/6 mx-auto text-center'>
                    <h1 className='font-noto-serif font-bold text-yellow-400 text-subHeading mpf-heading sm:text-3xl'>Manoj Photo Frames</h1>
                </div>
                <div className='w-1/6'></div>
            </div>

            {currentUser && currentUser.role == ROLES.CUSTOMER &&
            <nav className='sticky top-0 flex bg-red-700/90 h-10 w-full px-16 py-2 backdrop-blur-lg text-white mobile:px-16'>
                <ul className='flex w-full'>
                    <li className='pr-4 border-r border-solid border-red-100 hover:text-yellow-300'>Home</li>
                    <li className='px-4 border-r border-solid border-red-100 hover:text-yellow-300'>Browse</li>
                    <li className='px-4 border-r border-solid border-red-100 hover:text-yellow-300'>About</li>
                    <li className='px-4 hover:text-yellow-300'>Contact</li>
                </ul>
                <ul className='flex'>
                    <li className='px-4 border-r border-solid border-red-100 hover:text-yellow-300'>Cart</li>
                    <li className='px-4 border-r border-solid border-red-100 hover:text-yellow-300'>History</li>
                    <li className='px-4 border-r border-solid border-red-100 hover:text-yellow-300'>Profile</li>
                    <li className='pl-4 hover:text-yellow-300'>Logout</li>
                </ul>
            </nav>}
        </>
    )
}

export default Navbar