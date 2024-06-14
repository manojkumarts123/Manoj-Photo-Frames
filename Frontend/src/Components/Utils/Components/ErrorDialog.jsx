import React from 'react'

const ErrorDialog = ({ heading="", errorInfo  }) => {
    return (
        <div className='bg-red-300 border border-red-400 rounded text-red-950 text-small p-3 mb-6'>
            {heading && <p className='text-red-950 text-subHeading'>{ heading }</p>}
            { errorInfo }
        </div>
    )
}

export default ErrorDialog