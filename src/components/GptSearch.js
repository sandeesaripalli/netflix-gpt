import React from 'react'
import GptSearchBar from './GptSearchBar'
import GptSearchSuggestions from './GptSearchSuggestions'
import { BG_IMG } from '../utils/constants'

const GptSearch = () => {
  return (
    <div>
    <div className='fixed -z-10'>
    <img src={BG_IMG} alt='bg' />
    </div>
    <GptSearchBar />
    <GptSearchSuggestions />

    </div>
  )
}

export default GptSearch