import { createContext ,useEffect,useRef, useState} from "react";
import { albumsData as fallbackAlbums, songsData as fallbackSongs, newHitsData as fallbackNewHits, podcastsData as fallbackPodcasts } from "../assets/frontend-assets/assets";


export const PlayerContext = createContext();

const PlayerContextProvider = (props) => {

    const audioRef = useRef();  
    const seekBg = useRef();
    const seekBar = useRef();

    const [albums, setAlbums] = useState(fallbackAlbums);
    const [songs, setSongs] = useState(fallbackSongs);
    const [newHits, setNewHits] = useState(fallbackNewHits);
    const [podcasts, setPodcasts] = useState(fallbackPodcasts);
    const [track,setTrack] = useState(fallbackSongs[1]);
    const [playStatus,setPlayStatus] = useState(false);
    const [playlists, setPlaylists] = useState([]);
    const [time,setTime] = useState({
        currentTime:{
            second:0, minute:0
        },
        totalTime :{
            second:0,
            minute:0
        }
    });

    const play = () => {
        audioRef.current.play();
        setPlayStatus(true);
    }   
    const pause = () => {
        audioRef.current.pause();
        setPlayStatus(false);
    }

    const playWithId = async (id) => {
        setPlayStatus(true);
        if (songs[id]) {
            setTrack(songs[id]);
        }
    }

    const playMedia = async (media) => {
        // Play any media object (song, podcast, or playlist item)
        setPlayStatus(true);
        setTrack(media);
    }

    const previous = async () => {
        if(track.id>0){
            setPlayStatus(true);
            setTrack(songs[track.id-1]);
        }
    }

    const next = async () => {
        if(track.id<songs.length-1){
            setPlayStatus(true);
            setTrack(songs[track.id+1]);
        }
    }

    const seekSong = async (e) => {
        audioRef.current.currentTime = (e.nativeEvent.offsetX / seekBg.current.offsetWidth) * audioRef.current.duration;
        seekBar.current.style.width = (e.nativeEvent.offsetX / seekBg.current.offsetWidth) * 100 + "%";
    }

    const createPlaylist = (name) => {
        const newPlaylist = {
            id: Date.now(),
            name,
            songs: []
        }
        setPlaylists([...playlists, newPlaylist])
        return newPlaylist
    }

    const addToPlaylist = (playlistId, song) => {
        setPlaylists(playlists.map(playlist => {
            if (playlist.id === playlistId) {
                return {
                    ...playlist,
                    songs: playlist.songs.some(s => s.id === song.id) ? playlist.songs : [...playlist.songs, song]
                }
            }
            return playlist
        }))
    }

    const removeFromPlaylist = (playlistId, songId) => {
        setPlaylists(playlists.map(playlist => {
            if (playlist.id === playlistId) {
                return {
                    ...playlist,
                    songs: playlist.songs.filter(s => s.id !== songId)
                }
            }
            return playlist
        }))
    }

    const deletePlaylist = (playlistId) => {
        setPlaylists(playlists.filter(p => p.id !== playlistId))
    }

    useEffect(()=>{
        setTimeout(()=>{
            audioRef.current.ontimeupdate=()=>{
                seekBar.current.style.width = (audioRef.current.currentTime/audioRef.current.duration)*100 + "%";
                setTime({
                  currentTime:{
                       second:Math.floor(audioRef.current.currentTime%60),
                        minute:Math.floor(audioRef.current.currentTime/60)
                    },
                    totalTime :{
                        second:Math.floor(audioRef.current.duration%60),
                        minute:Math.floor(audioRef.current.duration/60)
                    }
                })
            }
        },1000)
    },[audioRef])

    useEffect(() => {
        const fetchCatalog = async () => {
            try {
                // Support both local development and production
                const backendURL = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000"
                
                const [songsResponse, albumsResponse] = await Promise.all([
                    fetch(`${backendURL}/api/song/list`),
                    fetch(`${backendURL}/api/album/list`)
                ])

                const songsJson = await songsResponse.json()
                const albumsJson = await albumsResponse.json()

                if (songsJson.success && songsJson.songs?.length) {
                    const mappedSongs = songsJson.songs.map((item, index) => ({
                        id: index,
                        name: item.name,
                        image: item.image,
                        file: item.file,
                        desc: item.desc,
                        duration: item.duration,
                        album: item.album
                    }))
                    setSongs(mappedSongs)
                    setTrack(mappedSongs[0])
                }

                if (albumsJson.success && albumsJson.albums?.length) {
                    const mappedAlbums = albumsJson.albums.map((item, index) => ({
                        id: index,
                        name: item.name,
                        image: item.image,
                        desc: item.desc,
                        bgColor: item.bgColor
                    }))
                    setAlbums(mappedAlbums)
                }
            } catch {
                setAlbums(fallbackAlbums)
                setSongs(fallbackSongs)
            }
        }

        fetchCatalog()
    }, [])

    useEffect(() => {
        if (playStatus && audioRef.current) {
            audioRef.current.play();
        }
    }, [track, playStatus])

        const contextValue={
            audioRef,
            seekBg,
            seekBar,
            track,setTrack,
            albums,
            songs,
            newHits,
            podcasts,
            playStatus,setPlayStatus,
            time,setTime,
            play,
            pause,
            playWithId,
            playMedia,
            previous,
            next,
            seekSong,
            playlists,
            createPlaylist,
            addToPlaylist,
            removeFromPlaylist,
            deletePlaylist
    }
    return (
        <PlayerContext.Provider value={contextValue}>
            {props.children}
        </PlayerContext.Provider>
    )
}

export default PlayerContextProvider;