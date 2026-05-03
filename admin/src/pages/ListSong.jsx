import {useState,useEffect} from 'react'
import axios from 'axios'
import {url} from '../api'
import { toast } from 'react-toastify'

const ListSong = () => {

const [data,setData] = useState([])

const fetchSongs = async () => {
  try {
    const response = await axios.get(`${url}/api/song/list`)
    if(response.data.success){
      setData(response.data.songs)
    }
  } catch {
    toast.error("error occur")
  }
}

const removeSong = async (id) => {
  try {
    const response = await axios.post(`${url}/api/song/remove`, { id })
    if (response.data.success) {
      toast.success(response.data.message)
      fetchSongs()
    }
  } catch {
    toast.error("error occur")
  }
}

useEffect(() => {
  fetchSongs()
}, [])

  return (
    <div>
      <p>ALL Songs List</p>
      <br/>
      <div>
        <div className='sm:grid hidden grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5 bg-gray-400' >
          <b>Image</b>
          <b>Name</b>
          <b>Album</b>
          <b>Duration</b>
          <b>Action</b>
        </div>
        {data.map((item,index) => {
            return(
              <div key={index} className="grid grid-cols-[1fr-_1fr_1fr] sm:grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5 ">
                <img className="w-12" src={item.image} alt="" />
                <p>{item.name}</p>
                <p>{item.album}</p>
                <p>{item.duration}</p>
                <p onClick={() => removeSong(item._id)} className="cursor-pointer">x</p>
              </div>
            )
        })}
         
      </div>
    </div>
  )
}

export default ListSong