import React, { useContext, useState } from "react";
import Navbar from "./Navbar";
import { useParams, useNavigate } from "react-router-dom";
import { assets } from "../assets/frontend-assets/assets";
import { PlayerContext } from "../context/PlayerContext";

const DisplayPlaylist = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { playlists, songs, podcasts, playMedia, removeFromPlaylist, addToPlaylist } =
    useContext(PlayerContext);
  const [showAddSongs, setShowAddSongs] = useState(false);
  const playlist = playlists.find((p) => p.id === Number(id));

  if (!playlist) {
    return (
      <>
        <Navbar />
        <div className="text-center py-10">
          <p className="text-xl text-gray-400">Playlist not found</p>
        </div>
      </>
    );
  }

  const availableSongs = [...songs, ...podcasts].filter(
    song => !playlist.songs.some(s => s.id === song.id)
  );

  return (
    <>
      <Navbar />
      <div className="mt-10 flex gap-8 flex-col md:flex-row md:items-end">
        <div className="w-48 h-48 bg-gradient-to-br from-purple-500 to-blue-500 rounded flex items-center justify-center">
          <p className="text-4xl text-white font-bold">♫</p>
        </div>
        <div className="flex flex-col">
          <p>Playlist</p>
          <h2 className="text-5xl font-bold mb-4 md:text-7xl">{playlist.name}</h2>
          <h4>{playlist.songs.length} songs</h4>
          <button 
            onClick={() => setShowAddSongs(!showAddSongs)}
            className="mt-4 bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 w-fit font-semibold text-sm"
          >
            {showAddSongs ? "Done" : "+ Add Songs"}
          </button>
        </div>
      </div>

      {showAddSongs && (
        <div className="mt-8 mb-8">
          <h3 className="text-xl font-bold mb-4">Available Songs & Podcasts</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {availableSongs.map((item, index) => (
              <div key={index} className="bg-gray-800 p-2 rounded hover:bg-gray-700 transition">
                <img src={item.image} alt={item.name} className="w-full h-32 object-cover rounded mb-2"/>
                <p className="text-sm font-semibold truncate">{item.name}</p>
                <button
                  onClick={() => {
                    addToPlaylist(playlist.id, item);
                  }}
                  className="mt-2 w-full bg-green-600 text-white px-2 py-1 rounded text-xs hover:bg-green-700 font-semibold"
                >
                  Add
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-3 sm:grid-cols-4 mt-10 mb-4 pl-2 text-[#a7a7a7]">
        <p>
          <b className="mr-4">#</b>Title
        </p>
        <p>Album</p>
        <p className="hidden sm:block">Date Added</p>
        <img className="m-auto w-4" src={assets.clock_icon} />
      </div>
      <hr />

      {playlist.songs.length > 0 ? (
        playlist.songs.map((item, index) => (
          <div
            onClick={() => playMedia(item)}
            key={index}
            className="group grid grid-cols-3 sm:grid-cols-4 mt-4 mb-4 gap-2 p-2 text-[#a7a7a7] hover:bg-[#ffffff2b] cursor-pointer items-center"
          >
            <p className="text-white">
              <b className="mr-4 text-[#a7a7a7]">{index + 1}</b>
              <img className="inline w-10 mr-5" src={item.image} alt="" />
              {item.name}
            </p>
            <p className="text-[15px]">{item.album || item.host || "Custom"}</p>
            <p className="text-[15px] hidden sm:block">Today</p>
            <div className="text-center">
              <p
                onClick={(e) => {
                  e.stopPropagation();
                  removeFromPlaylist(playlist.id, item.id);
                }}
                className="cursor-pointer hover:text-red-500"
              >
                ✕
              </p>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-400 py-10">
          No songs in this playlist yet. Click "+ Add Songs" to get started!
        </p>
      )}
    </>
  );
};

export default DisplayPlaylist;
