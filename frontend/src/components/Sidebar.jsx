import React from 'react'
import {assets} from '../assets/frontend-assets/assets'
import { useNavigate } from 'react-router-dom'
import { useContext, useState } from 'react'
import { PlayerContext } from '../context/PlayerContext'

const Sidebar = () => {

    const navigate = useNavigate()
    const { playlists, createPlaylist, deletePlaylist } = useContext(PlayerContext)
    const [newPlaylistName, setNewPlaylistName] = useState("")
    const [showCreateForm, setShowCreateForm] = useState(false)

    const handleCreatePlaylist = (e) => {
        e.preventDefault()
        if (newPlaylistName.trim()) {
            createPlaylist(newPlaylistName)
            setNewPlaylistName("")
            setShowCreateForm(false)
        }
    }

  return (
    <div className="w-[25%] h-full p-2 flex-col gap-2 text-white hidden lg:flex">
        <div className="bg-[#121212] h-[15%] rounded flex flex-col justify-around">
            <div onClick={()=>navigate('/')} className="flex items-center gap-3 pl-8 cursor-pointer hover:text-green-500">
             <img className="w-6" src={assets.home_icon}/>
               <p className="font-bold">Home</p>
            </div>
            <div onClick={()=>navigate('/playlists')} className="flex items-center gap-3 pl-8 cursor-pointer hover:text-green-500">
             <img className="w-6" src={assets.search_icon}/>
               <p className="font-bold">Playlists</p>
            </div>
        </div>
        <div className='bg-[#121212] h-[85%] rounded overflow-y-auto'>
            <div className="p-4 flex items-center justify-between sticky top-0 bg-[#121212]">
                <div className="flex items-center gap-3">
                    <img className="w-6" src={assets.stack_icon}/>
                    <p className="font-bold">Your Library</p>
                </div>
                <div className="flex items-center gap-3">
                    <img className="w-5" src={assets.arrow_icon}/>
                    <img onClick={()=>setShowCreateForm(!showCreateForm)} className="w-5 cursor-pointer hover:text-green-500" src={assets.plus_icon}/>
                </div>
            </div>
            
            {showCreateForm && (
                <form onSubmit={handleCreatePlaylist} className="p-4 bg-[#242424] m-2 rounded">
                    <input 
                        type="text" 
                        placeholder="Playlist name..."
                        value={newPlaylistName}
                        onChange={(e) => setNewPlaylistName(e.target.value)}
                        className="w-full px-3 py-2 rounded bg-gray-700 text-white outline-none text-sm mb-2"
                        autoFocus
                    />
                    <button type="submit" className='px-4 py-1 bg-green-600 text-[13px] text-white rounded-full cursor-pointer hover:bg-green-700 w-full'>
                        Create
                    </button>
                </form>
            )}

            {playlists.length > 0 ? (
                <div className="p-2">
                    <p className="text-gray-400 text-xs px-2 py-2 font-semibold">MY PLAYLISTS</p>
                    {playlists.map((playlist) => (
                        <div key={playlist.id} className="p-2 hover:bg-[#242424] rounded cursor-pointer group flex justify-between items-center">
                            <div onClick={() => navigate(`/playlist/${playlist.id}`)} className="flex-1">
                                <p className="font-semibold text-sm">{playlist.name}</p>
                                <p className="text-gray-400 text-xs">{playlist.songs.length} songs</p>
                            </div>
                            <button
                                onClick={() => deletePlaylist(playlist.id)}
                                className="opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-300 text-xs px-2"
                            >
                                ✕
                            </button>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="p-4 bg-[#242424] m-2 rounded font-semibold flex flex-col items-start justify-start gap-1 pl-4">
                    <h1>Create your first playlist</h1>
                    <p className="font-light">Get started by creating a new playlist</p>
                    <button onClick={()=>setShowCreateForm(true)} className='px-4 py-1 bg-white text-[15px] text-black rounded-full mt-4 cursor-pointer hover:bg-gray-200'>Create playlist</button>
                </div>
            )}

            <div className="p-4 bg-[#242424] m-2 rounded font-semibold flex flex-col items-start justify-start gap-1 pl-4 mt-4">
                <h1>Podcasts to follow</h1>
                <p className="font-light">updates on new episode</p>
                <button className='px-4 py-1 bg-white text-[15px] text-black rounded-full mt-4 cursor-pointer hover:bg-gray-200'>Listen Podcast</button>
            </div>
        </div>
    </div>
  )
}

export default Sidebar