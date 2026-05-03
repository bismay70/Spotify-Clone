import React from 'react'
import {assets } from '../assets/assets'
import { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { url } from '../api'

const AddAlbum = () => {

    const [image,setImage] = useState(null);
    const [color,setColor] =useState("#000000");
    const [name,setName] = useState("");
    const [desc,setDesc] = useState("");
    const [loading,setLoading] = useState(false);

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append("image", image);
            formData.append("name", name);
            formData.append("desc", desc);
            formData.append("bgColor", color);

            const response = await axios.post(`${url}/api/album/add`, formData);
            if (response.data.success) {
                toast.success(response.data.message);
                setImage(null);
                setColor("#000000");
                setName("");
                setDesc("");
            } else {
                toast.error("Something went wrong");
            }
        } catch {
            toast.error("Error occurred");
        }
        setLoading(false);
    }

  return (
    <form onSubmit={onSubmitHandler} className="flex flex-col items-start gap-8 text-gray-800">
        <div className="flex flex-col gap-4">
        <p>Upload Image</p>
        <input onChange={(e)=>setImage(e.target.files[0])} type="file" id="image" accept='image/*' hidden/>
        <label htmlFor='image'>
            <img className='w-24 cursor-pointer' src={image ? URL.createObjectURL(image) : assets.upload_area} alt="" />
        </label>
        </div>

        <div className='flex flex-col gap-2.5 '>
            <p>Album Name</p>
            <input onChange={(e)=>setName(e.target.value)} value={name} type="text" className="p-2.5 border-2 border-gray-400 rounded-md w-[max(40vw,250px)] outline-green-600" placeholder="type here" required />
        </div>
        <div className='flex flex-col gap-2.5 '>
            <p>Album Description</p>
            <input onChange={(e)=>setDesc(e.target.value)} value={desc} type="text" className="p-2.5 border-2 border-gray-400 rounded-md w-[max(40vw,250px)] outline-green-600" placeholder="type here" required />
        </div>

        <div className='flex flex-col gap-3'>
            <p>BG color</p>
            <input onChange={(e)=>setColor(e.target.value)} value={color} type="color"/>
        </div>

        <button className="text-base bg-black text-white py-2.5 px-14 cursor-pointer" type="submit">ADD</button>
    </form>
  )
}

export default AddAlbum