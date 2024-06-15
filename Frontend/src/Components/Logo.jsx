import React from 'react'

const Logo = ({ width, heigth }) => {
    return (
        <>
            <img src="../../assets/images/Manoj Photo Frames.jpg" width={width ? width : '50px'} height={heigth ? heigth : '50px'} />
        </>
    )
}

export default Logo