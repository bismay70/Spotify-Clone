import React from 'react'
import {assets} from '../assets/frontend-assets/assets'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

const Navbar = ({ onSearch }) => {

    const navigate = useNavigate()
    const [searchValue, setSearchValue] = useState("")

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
            <p className="bg-red-600 text-black w-7 h-7 rounded-full flex items-center justify-center cursor-pointer hover:bg-red-700">B</p>
        </div>  
    </div>
      <div className="flex items-center gap-2 mt-4">
            <p className='bg-white text-black px-4 py-1 rounded-2xl cursor-pointer hover:bg-gray-200' >All</p>
            <p className="bg-black px-4 py-1 rounded-2xl cursor-pointer hover:bg-gray-800">Music</p>
            <p className="bg-black px-4 py-1 rounded-2xl cursor-pointer hover:bg-gray-800">Podcasts</p>
        </div>  
    </>
  )
}

export default Navbar