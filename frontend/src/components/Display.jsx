import React from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import DisplayHome from './DisplayHome'
import DisplayAlbum from './DisplayAlbum'
import DisplaySearch from './DisplaySearch'
import DisplayPlaylist from './DisplayPlaylist'
import DisplayPlaylists from './DisplayPlaylists'
import { useRef , useEffect, useContext} from 'react'
import { PlayerContext } from '../context/PlayerContext'

const Display = () => {

    const displayRef = useRef();
    const location = useLocation();
    const { albums } = useContext(PlayerContext)
    const isAlbum = location.pathname.includes('album');
    const albumMatch = location.pathname.match(/\/album\/(\d+)/);
    const albumId = albumMatch ? Number(albumMatch[1]) : null;
    const bgColor = isAlbum && albums[albumId] ? albums[albumId].bgColor : '#121212';

    useEffect(()=>{
        if(isAlbum){
            displayRef.current.style.background = `linear-gradient(to bottom, ${bgColor}, #121212)`;
        }
        else{
            displayRef.current.style.background = '#121212';
        }
    },[isAlbum,bgColor])

  return (
    <div ref={displayRef} className='w-[100%] m-2 px-6 pt-4 rounded bg-[#121212] text-white overflow-auto lg:w-[75%] lg:ml-0'>
        <Routes>
            <Route path='/' element={<DisplayHome/>}/>
            <Route path='/album/:id' element={<DisplayAlbum/>}/>
            <Route path='/search' element={<DisplaySearch/>}/>
            <Route path='/playlist/:id' element={<DisplayPlaylist/>}/>
            <Route path='/playlists' element={<DisplayPlaylists/>}/>
        </Routes>
    </div>
  )
}

export default Display