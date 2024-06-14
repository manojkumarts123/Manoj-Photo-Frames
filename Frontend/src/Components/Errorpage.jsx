import React from 'react'
import { useRouteError, isRouteErrorResponse } from 'react-router-dom'

const Errorpage = () => {
  const error = useRouteError()
  // const error = useRouteError()
  console.log(error);
  console.log(isRouteErrorResponse(error));
  
  return (
    <div>Errorpage</div>
  )
}

export default Errorpage