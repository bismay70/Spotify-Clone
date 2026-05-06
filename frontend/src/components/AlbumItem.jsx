import React from 'react'
import { useNavigate } from 'react-router-dom'

const AlbumItem = ({image,name,desc,id}) => {

    const navigate = useNavigate()

  return (
    <div onClick={()=>navigate(`/album/${id}`)} className="flex-shrink-0 w-40 p-2 px-3 rounded cursor-pointer hover:bg-[#ffffff26]">
            <img className="rounded w-full h-40 object-cover" src={image}/>
            <p className="font-bold mt-2 mb-1 text-sm truncate">{name}</p>
            <p className='text-slate-200 text-xs truncate'>{desc}</p>
    </div>
  )
}

export default AlbumItem