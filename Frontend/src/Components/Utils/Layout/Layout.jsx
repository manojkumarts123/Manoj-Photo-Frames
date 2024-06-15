import React from 'react'
import { Outlet } from 'react-router-dom'

const Layout = ({ bgColor='', backdrop='' }) => {
  let className = ''

  switch (bgColor) {
    case 'dark':
      className += 'bg-red-400'
      break;
    case 'light':
      className += 'bg-red-100'
      break;
    default:
      break;
  }

  switch (backdrop) {
    case 1:
      className += ' bg-backdrop1 bg-cover'
      break;
  
    default:
      break;
  }
  return (
    <div className={className + ' min-h-[calc(100svh-50px)] px-6 mobile:px-16'}>
        <Outlet />
    </div>
  )
}

export default Layout