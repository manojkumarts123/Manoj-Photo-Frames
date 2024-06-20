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
    case '1-light':
      className += ' bg-backdrop1-light bg-cover'
      break;
    case '1-dark':
      className += ' bg-backdrop1-dark bg-cover'
      break;
  
    default:
      break;
  }
  return (
    <div className={`${className} flex-1 p-6 mobile:px-16 mobile:py-8`}>
        <Outlet />
    </div>
  )
}

export default Layout