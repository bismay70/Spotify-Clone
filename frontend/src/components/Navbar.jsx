import React from 'react'
import {assets} from '../assets/frontend-assets/assets'
import { useNavigate } from 'react-router-dom'
import { useState, useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

const Navbar = ({ onSearch }) => {

    const navigate = useNavigate()
    const { user, logout } = useContext(AuthContext)
    const [searchValue, setSearchValue] = useState("")
    const [showLogout, setShowLogout] = useState(false)

    const handleSearch = (value) => {
        setSearchValue(value)
        if (value.trim()) {
            navigate(`/search?q=${encodeURIComponent(value)}`)
            if (onSearch) {
                onSearch(value)
            }
        } else {
            navigate('/')
        }
    }

    const handleLogout = () => {
        logout()
        navigate('/login')
    }

    const getInitial = () => {
        return user?.name?.charAt(0).toUpperCase() || 'U'
    }

  return (
    <>
    <div className='w-full flex justify-between items-center font-semibold'>
        <div className='flex gap-2 items-center'>
            <img onClick={()=>navigate(-1)}className='w-8 bg-black p-2 rounded-2xl cursor-pointer hover:bg-gray-800' src={assets.arrow_left}/>
            <img onClick={()=>navigate(1)}className='w-8 bg-black p-2 rounded-2xl cursor-pointer hover:bg-gray-800' src={assets.arrow_right}/>
        </div>
        <div className='flex gap-4 items-center '>
            <input 
              type="text"
              placeholder="Search songs, albums..."
              value={searchValue}
              onChange={(e) => handleSearch(e.target.value)}
              className="px-4 py-2 rounded-2xl bg-white text-black outline-none text-[14px] w-64 focus:ring-2 focus:ring-green-500"
            />
            <p className="bg-white text-black text-[15px] px-4 py-1 rounded-2xl hidden md:block cursor-pointer hover:bg-gray-200">Explore Premium</p>
            <p className='bg-black py-1 px-3 rounded-2xl text-[15px] cursor-pointer hover:bg-gray-800'>Install App</p>
            <div className="relative">
                <div 
                    onClick={() => setShowLogout(!showLogout)}
                    className="bg-green-500 text-black w-7 h-7 rounded-full flex items-center justify-center cursor-pointer hover:bg-green-400 font-bold"
                >
                    {getInitial()}
                </div>
                {showLogout && (
                    <div className="absolute right-0 mt-2 w-32 bg-gray-800 rounded shadow-lg z-20">
                        <div className="px-4 py-2 text-white text-sm border-b border-gray-700">
                            <p className="font-semibold">{user?.name}</p>
                            <p className="text-gray-400 text-xs">{user?.email}</p>
                        </div>
                        <button 
                            onClick={handleLogout}
                            className="w-full text-left px-4 py-2 text-red-400 hover:bg-gray-700 text-sm"
                        >
                            Logout
                        </button>
                    </div>
                )}
            </div>
        </div>  
    </div>
      
    </>
  )
}

export default Navbar