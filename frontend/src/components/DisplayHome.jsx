import React from "react";
import Navbar from "./Navbar";
import AlbumItem from "./AlbumItem";
import SongItem from "./SongItem";
import PodcastItem from "./PodcastItem";
import { useContext, useState } from "react";
import { PlayerContext } from "../context/PlayerContext";

const DisplayHome = () => {
  const { albums, songs, newHits, podcasts } = useContext(PlayerContext);
  const [filter, setFilter] = useState("all"); // all, music, podcasts

  const showMusic = filter === "all" || filter === "music";
  const showPodcasts = filter === "all" || filter === "podcasts";

  return (
    <>
      <Navbar />
      
      {/* Filter Buttons */}
      <div className="flex items-center gap-2 mt-4 mb-4">
        <button
          onClick={() => setFilter("all")}
          className={`px-4 py-1 rounded-2xl cursor-pointer text-sm font-semibold transition ${
            filter === "all"
              ? "bg-green-600 text-white hover:bg-green-700"
              : "bg-black text-white hover:bg-gray-800 border border-gray-600"
          }`}
        >
          All
        </button>
        <button
          onClick={() => setFilter("music")}
          className={`px-4 py-1 rounded-2xl cursor-pointer text-sm font-semibold transition ${
            filter === "music"
              ? "bg-green-600 text-white hover:bg-green-700"
              : "bg-black text-white hover:bg-gray-800 border border-gray-600"
          }`}
        >
          Music
        </button>
        <button
          onClick={() => setFilter("podcasts")}
          className={`px-4 py-1 rounded-2xl cursor-pointer text-sm font-semibold transition ${
            filter === "podcasts"
              ? "bg-green-600 text-white hover:bg-green-700"
              : "bg-black text-white hover:bg-gray-800 border border-gray-600"
          }`}
        >
          Podcasts
        </button>
      </div>

      {showMusic && (
        <>
          <div className="mb-4">
            <h1 className="my-5 font-bold text-2xl">Featured Charts</h1>
            <div className="flex overflow-auto gap-2 h-56">
              {albums.map((item, index) => (
                <AlbumItem
                  key={index}
                  name={item.name}
                  desc={item.desc}
                  id={item.id}
                  image={item.image}
                />
              ))}
            </div>
          </div>

          <div className="mb-4">
            <h1 className="my-5 font-bold text-2xl">Today's Biggest Hits</h1>
            <div className="flex overflow-auto gap-2 h-56">
              {songs.map((item, index) => (
                <SongItem
                  key={index}
                  name={item.name}
                  desc={item.desc}
                  id={item.id}
                  image={item.image}
                  song={item}
                />
              ))}
            </div>
          </div>

          <div className="mb-4">
            <h1 className="my-5 font-bold text-2xl">New Hits</h1>
            <div className="flex overflow-auto gap-2 h-56">
              {newHits.map((item, index) => (
                <SongItem
                  key={index}
                  name={item.name}
                  desc={item.desc}
                  id={item.id}
                  image={item.image}
                  song={item}
                />
              ))}
            </div>
          </div>
        </>
      )}

      {showPodcasts && (
        <div className="mb-4">
          <h1 className="my-5 font-bold text-2xl">Popular Podcasts</h1>
          <div className="flex overflow-auto gap-2 h-56">
            {podcasts.map((item, index) => (
              <PodcastItem
                key={index}
                name={item.name}
                desc={item.desc}
                host={item.host}
                id={item.id}
                image={item.image}
                podcast={item}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default DisplayHome;
