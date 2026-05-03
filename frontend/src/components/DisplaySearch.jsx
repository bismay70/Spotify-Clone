import React, { useContext, useState, useEffect } from "react";
import Navbar from "./Navbar";
import SongItem from "./SongItem";
import { PlayerContext } from "../context/PlayerContext";
import { useSearchParams } from "react-router-dom";

const DisplaySearch = () => {
  const { songs } = useContext(PlayerContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const [results, setResults] = useState([]);
  const searchQuery = searchParams.get("q") || "";

  useEffect(() => {
    if (searchQuery.trim()) {
      const filtered = songs.filter(
        (song) =>
          song.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          song.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
          song.album.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setResults(filtered);
    } else {
      setResults([]);
    }
  }, [searchQuery, songs]);

  const handleSearch = (value) => {
    if (value.trim()) {
      setSearchParams({ q: value });
    } else {
      setSearchParams({});
    }
  };

  return (
    <>
      <Navbar onSearch={handleSearch} />
      <div className="mb-4">
        <h1 className="my-5 font-bold text-2xl">
          Search Results for "{searchQuery}"
        </h1>
        {results.length > 0 ? (
          <div className="flex overflow-auto">
            {results.map((item, index) => (
              <SongItem
                key={index}
                name={item.name}
                desc={item.desc}
                id={item.id}
                image={item.image}
              />
            ))}
          </div>
        ) : (
          <p className="text-gray-400">
            {searchQuery.trim()
              ? "No songs found matching your search."
              : "Start typing to search for songs."}
          </p>
        )}
      </div>
    </>
  );
};

export default DisplaySearch;
