import React, { useContext, useState, useEffect } from "react";
import Navbar from "./Navbar";
import SongItem from "./SongItem";
import PodcastItem from "./PodcastItem";
import { PlayerContext } from "../context/PlayerContext";
import { useSearchParams, useNavigate } from "react-router-dom";

const DisplaySearch = () => {
  const { songs, podcasts } = useContext(PlayerContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const [results, setResults] = useState([]);
  const searchQuery = searchParams.get("q") || "";
  const navigate = useNavigate();

  useEffect(() => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }
    
    const allItems = [...songs, ...podcasts];
    const filtered = allItems.filter(
      (item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.album && item.album.toLowerCase().includes(searchQuery.toLowerCase()))
    );
    setResults(filtered);
  }, [searchQuery, songs, podcasts]);

  const handleSearch = (value) => {
    if (value.trim()) {
      setSearchParams({ q: value });
    } else {
      setSearchParams({});
      navigate("/");
    }
  };

  if (!searchQuery.trim()) {
    return (
      <>
        <Navbar onSearch={handleSearch} />
        <div className="text-center py-20">
          <p className="text-gray-400 text-lg">Start typing to search for songs and podcasts</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar onSearch={handleSearch} />
      <div className="mb-4">
        <h1 className="my-5 font-bold text-2xl">
          Search Results for "{searchQuery}"
        </h1>
        {results.length > 0 ? (
          <div className="flex overflow-auto gap-2">
            {results.map((item, index) => (
              item.host ? (
                <PodcastItem
                  key={index}
                  name={item.name}
                  desc={item.desc}
                  host={item.host}
                  id={item.id}
                  image={item.image}
                  podcast={item}
                />
              ) : (
                <SongItem
                  key={index}
                  name={item.name}
                  desc={item.desc}
                  id={item.id}
                  image={item.image}
                  song={item}
                />
              )
            ))}
          </div>
        ) : (
          <p className="text-gray-400">
            No songs or podcasts found matching your search.
          </p>
        )}
      </div>
    </>
  );
};

export default DisplaySearch;
