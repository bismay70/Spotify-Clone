import React from "react";
import Navbar from "./Navbar";
import AlbumItem from "./AlbumItem";
import SongItem from "./SongItem";
import PodcastItem from "./PodcastItem";
import { useContext } from "react";
import { PlayerContext } from "../context/PlayerContext";

const DisplayHome = () => {
  const { albums, songs, newHits, podcasts } = useContext(PlayerContext);

  return (
    <>
      <Navbar />
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
    </>
  );
};

export default DisplayHome;
