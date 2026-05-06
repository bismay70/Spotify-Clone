import React from 'react'
import { useContext, useState } from 'react'
import { PlayerContext } from '../context/PlayerContext'

const PodcastItem = ({name,image,desc,host,id,podcast}) => {

    const {playMedia, playlists, addToPlaylist} = useContext(PlayerContext);
    const [showPlaylistMenu, setShowPlaylistMenu] = useState(false);
    const podcastData = {id, name, desc, image, host, file: podcast.file, duration: podcast.duration};

    const handleAddToPlaylist = (playlistId, e) => {
        e.stopPropagation();
        addToPlaylist(playlistId, podcastData);
        setShowPlaylistMenu(false);
    }

  return (
    <div onClick={()=>playMedia(podcastData)} className="flex-shrink-0 w-40 p-2 px-3 rounded cursor-pointer hover:bg-[#ffffff26] relative group">
        <img className="rounded w-full h-40 object-cover" src={image}/>
        <p className="font-bold mt-2 mb-1 text-sm truncate">{name}</p>
        <p className="text-slate-200 text-xs truncate">{desc}</p>
        <p className="text-gray-400 text-xs mt-1 truncate">{host}</p>
        
        <button 
            onClick={(e) => {
                e.stopPropagation();
                setShowPlaylistMenu(!showPlaylistMenu);
            }}
            className="absolute top-2 right-2 bg-green-600 hover:bg-green-700 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition"
        >
            +
        </button>

        {showPlaylistMenu && (
            <div className="absolute top-8 right-2 bg-gray-800 border border-gray-700 rounded shadow-lg z-10 min-w-[200px]">
                {playlists.length > 0 ? (
                    <>
                        {playlists.map((playlist) => (
                            <button
                                key={playlist.id}
                                onClick={(e) => handleAddToPlaylist(playlist.id, e)}
                                className="w-full text-left px-4 py-2 hover:bg-gray-700 text-sm text-white first:rounded-t last:rounded-b"
                            >
                                {playlist.name}
                            </button>
                        ))}
                    </>
                ) : (
                    <p className="px-4 py-2 text-gray-400 text-sm">No playlists yet</p>
                )}
            </div>
        )}
    </div>
  )
}

export default PodcastItem
