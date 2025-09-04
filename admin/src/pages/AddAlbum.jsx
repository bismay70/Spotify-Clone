import React from 'react'
import {assets } from '../assets/assets'

const AddAlbum = () => {

    const [image,setImage] = useState(false);
    const [color,setColor] =useState("#000000");
    const [name,setName] = useState("");
    const [desc,setDesc] = useState("");
    const [loading,setLoading] = useState(false);

  return (
    <form className="flex flex-col items-start gap-8 text-gray-800">
        <div className="flex flex-col gap-4">
        <p>Upload Image</p>
        <input type="file" id="image" accept='image/*' hidden/>
        <label htmlFor='image'>
            <img className='w-24 cursor-pointer' src={assets.upload_area} alt="" />
        </label>
        </div>

        <div className='flex flex-col gap-2.5 '>
            <p>Album Name</p>
            <input type="text" className="p-2.5 border-2 border-gray-400 rounded-md w-[max(40vw,250px)] outline-green-600" placeholder="type here" required />
        </div>
        <div className='flex flex-col gap-2.5 '>
            <p>Album Description</p>
            <input type="text" className="p-2.5 border-2 border-gray-400 rounded-md w-[max(40vw,250px)] outline-green-600" placeholder="type here" required />
        </div>

        <div className='flex flex-col gap-3'>
            <p>BG color</p>
            <input type="color"/>
        </div>

        <button className="text-base bg-black text-white py-2.5 px-14 cursor-pointer" type="submit">ADD</button>
    </form>
  )
}

export default AddAlbum