import { createContext ,useEffect,useRef, useState} from "react";
import { albumsData as fallbackAlbums, songsData as fallbackSongs } from "../assets/frontend-assets/assets";


export const PlayerContext = createContext();

const PlayerContextProvider = (props) => {

    const audioRef = useRef();  
    const seekBg = useRef();
    const seekBar = useRef();

    const [albums, setAlbums] = useState(fallbackAlbums);
    const [songs, setSongs] = useState(fallbackSongs);
    const [track,setTrack] = useState(fallbackSongs[1]);
    const [playStatus,setPlayStatus] = useState(false);
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
        setTrack(songs[id]);
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
                const [songsResponse, albumsResponse] = await Promise.all([
                    fetch("http://localhost:4000/api/song/list"),
                    fetch("http://localhost:4000/api/album/list")
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
            playStatus,setPlayStatus,
            time,setTime,
            play,
            pause,
            playWithId,
            previous,
            next,
            seekSong

    }
    return (
        <PlayerContext.Provider value={contextValue}>
            {props.children}
        </PlayerContext.Provider>
    )
}

export default PlayerContextProvider;