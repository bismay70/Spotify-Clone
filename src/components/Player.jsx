import React from 'react'
import {songsData} from '../assets/frontend-assets/assets'
import {assets} from '../assets/frontend-assets/assets'

const Player = () => {
  return (
    <div className="h-[10%] bg-black flex justify-between items-center text-white px-4">
        <div className=" hidden lg:flex items-center gap-4">
            <img className='w-12' src={songsData[0].image}/>
            <div>
                <p>{songsData[0].name}</p>
                <p>{songsData[0].desc.slice(0,12)}</p>
            </div>
        </div>
        <div className="flex flex-col items-center gap-1 m-auto">
            <div className="flex gap-4">
                <img className='w-4' src={assets.shuffle_icon}/>
                <img className='w-4' src={assets.prev_icon}/>
                <img className='w-4' src={assets.play_icon}/>
                <img className='w-4' src={assets.next_icon}/>
                <img className='w-4' src={assets.loop_icon}/>
            </div>
            <div className="flex gap-5 items-center">
                <p>0:00</p>
                <div className="max-w-[500px] w-[60vw] bg-gray-300 rounded-full cursor-pointer">
                    <hr className='h-1 border-none w-0 bg-green-800 rounded-full'></hr>
                </div>
                <p>3:45</p>
            </div>
        </div>
        <div className="hidden lg:flex items-center gap-2 opacity-75">
            <img className="w-4" src={assets.plays_icon}/>
            <img className='w-4' src={assets.mic_icon}/>
            <img className='w-4' src={assets.queue_icon}/>
            <img className='w-4' src={assets.speaker_icon}/>
            <img className='w-4' src={assets.volume_icon}/>
            <div className='w-20 bg-slate-50 h-1 rounded'></div>
            <img className='w-4' src={assets.mini_player_icon}/>
            <img className='w-4' src={assets.zoom_icon}/>
        </div>
    </div>
  )
}

export default Player