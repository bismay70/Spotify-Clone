import React from 'react'
import { Link } from 'react-router-dom'
import { assets } from '../assets/assets'

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-[#003A10] shadow-md">
      <div className="flex items-center gap-3">
        <img src={assets.logo_small} alt="Logo" className="w-10 h-10" />
        <span className="text-white text-xl font-bold hidden sm:block">Spotify Admin</span>
      </div>
      <div className="flex items-center gap-6">
        <Link to="/add-song" className="text-white hover:text-[#00FF5B] font-medium">Add Song</Link>
        <Link to="/list-song" className="text-white hover:text-[#00FF5B] font-medium">List Song</Link>
        <Link to="/add-album" className="text-white hover:text-[#00FF5B] font-medium">Add Album</Link>
        <Link to="/list-album" className="text-white hover:text-[#00FF5B] font-medium">List Album</Link>
      </div>
    </nav>
  )
}

export default Navbar