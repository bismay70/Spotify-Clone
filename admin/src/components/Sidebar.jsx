import React from 'react'
import { assets } from '../assets/assets'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className="bg-[#003A10] min-h-screen pl-[4vw]">
        <img src={assets.logo} className="mt-5 w-[max(10vw,100px)] hidden sm:block mr-8"alt="Logo" />
        <img src={assets.logo_small} className="mt-5 w-[max(5vw,40px)] sm:hidden block" alt="Logo" />

        <NavLink to="/add-song" className='m-5 flex items-center gap-2.5 text-gray-800 bg-white border border-black p-2 pr-[max(8vw,10px)] drop-shadow-[-4px_4px_#00FF5B] text-sm font-medium'>
         <img src={assets.add_song} className="w-5"/>
         <p className="hidden sm:block" >Add Song</p>
        </NavLink>

        <NavLink to="/list-song" className='m-5 flex items-center gap-2.5 text-gray-800 bg-white border border-black p-2 pr-[max(8vw,10px)] drop-shadow-[-4px_4px_#00FF5B] text-sm font-medium'>
         <img src={assets.song_icon} className="w-5"/>
         <p className="hidden sm:block" >List Song</p>
        </NavLink>

        <NavLink to="/add-album" className='m-5 flex items-center gap-2.5 text-gray-800 bg-white border border-black p-2 pr-[max(8vw,10px)] drop-shadow-[-4px_4px_#00FF5B] text-sm font-medium'>
         <img src={assets.add_album} className="w-5"/>
         <p className="hidden sm:block" >Add Album</p>
        </NavLink>

        <NavLink to="/list-album" className='m-5 flex items-center gap-2.5 text-gray-800 bg-white border border-black p-2 pr-[max(8vw,10px)] drop-shadow-[-4px_4px_#00FF5B] text-sm font-medium'>
         <img src={assets.album_icon} className="w-5"/>
         <p className="hidden sm:block" >List Album</p>
        </NavLink>
    </div>
  )
}

export default Sidebar