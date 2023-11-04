import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div className='h-[50px] bg-slate-300 border-[1px] border-b-gray-300'>
        <div className='px-2 h-full flex items-center justify-between'>
          <div className=''>
            <Link to="/">BKlive</Link>
          </div>
          <div className='bg-blue-300 p-2 rounded-lg cursor-pointer'>
            <Link to={`/create`}>Create Room</Link>
          </div>
        </div>
    </div>
  )
}

export default Header