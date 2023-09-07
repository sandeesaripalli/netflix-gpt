import React from 'react'

const VideoTitle = ({title, overview}) => {
  return (
    <div className='w-screen aspect-video pt-[20%] absolute px-24 text-white bg-gradient-to-r from-slate-800'>
    <h1 className='text-6xl font-bold'>{title}</h1>
    <p className='py-6 text-lg w-1/4'>{overview}</p>
    <div className='flex items-center'>
    <button className='bg-white text-black p-4 px-12 text-xl  rounded-lg flex items-center hover:bg-opacity-80'><span className="material-icons">play_arrow</span>Play</button>
    <button className='mx-2 bg-gray-500 text-white p-4 px-12 text-xl bg-opacity-60 rounded-lg flex items-center'><span className="material-icons">info</span>More Info</button>
    </div>
    </div>
  )
}

export default VideoTitle