import React from 'react'
import { BASE_URL } from '../constants'

const Logo = ({ width, heigth }) => {
    return (
        <>
            <img src={`${BASE_URL}/assets/images/Manoj Photo Frames.jpg`} width={width ? width : '50px'} height={heigth ? heigth : '50px'} />
        </>
    )
}

export default Logo