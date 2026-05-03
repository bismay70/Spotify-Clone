import React, { useContext, useState } from "react";
import Navbar from "./Navbar";
import { PlayerContext } from "../context/PlayerContext";
import { useNavigate } from "react-router-dom";

const DisplayPlaylists = () => {
  const { playlists, createPlaylist, deletePlaylist } = useContext(PlayerContext);
  const [newPlaylistName, setNewPlaylistName] = useState("");
  const [showCreateForm, setShowCreateForm] = useState(false);
  const navigate = useNavigate();

  const handleCreatePlaylist = (e) => {
    e.preventDefault();
    if (newPlaylistName.trim()) {
      createPlaylist(newPlaylistName);
      setNewPlaylistName("");
      setShowCreateForm(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="mb-4">
        <div className="flex justify-between items-center my-5">
          <h1 className="font-bold text-2xl">My Playlists</h1>
          <button
            onClick={() => setShowCreateForm(!showCreateForm)}
            className="bg-green-600 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-green-700"
          >
            {showCreateForm ? "Cancel" : "+ Create Playlist"}
          </button>
        </div>

        {showCreateForm && (
          <form onSubmit={handleCreatePlaylist} className="mb-4">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Playlist name..."
                value={newPlaylistName}
                onChange={(e) => setNewPlaylistName(e.target.value)}
                className="px-4 py-2 rounded bg-gray-700 text-white outline-none flex-1"
                autoFocus
              />
              <button
                type="submit"
                className="bg-green-600 px-4 py-2 rounded font-semibold hover:bg-green-700"
              >
                Create
              </button>
            </div>
          </form>
        )}

        {playlists.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {playlists.map((playlist) => (
              <div
                key={playlist.id}
                className="bg-gray-800 p-4 rounded-lg hover:bg-gray-700 transition cursor-pointer group"
                onClick={() => navigate(`/playlist/${playlist.id}`)}
              >
                <div className="w-full h-40 bg-gradient-to-br from-purple-500 to-blue-500 rounded mb-4 flex items-center justify-center">
                  <p className="text-4xl text-white font-bold">♫</p>
                </div>
                <h3 className="font-semibold text-lg mb-2">{playlist.name}</h3>
                <p className="text-gray-400 text-sm mb-3">
                  {playlist.songs.length} songs
                </p>
                <div className="flex justify-between">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/playlist/${playlist.id}`);
                    }}
                    className="text-blue-400 hover:text-blue-300 text-sm"
                  >
                    View
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deletePlaylist(playlist.id);
                    }}
                    className="text-red-400 hover:text-red-300 text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-10">
            <p className="text-gray-400 text-lg mb-4">
              No playlists yet. Create one to get started!
            </p>
            <button
              onClick={() => setShowCreateForm(true)}
              className="bg-green-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-green-700"
            >
              Create Your First Playlist
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default DisplayPlaylists;
