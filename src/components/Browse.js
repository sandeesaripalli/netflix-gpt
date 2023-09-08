import React from 'react'
import HeaderComponent from './HeaderComponent'

import MainContainer from './MainContainer';
import SecondaryContainer from './SecondaryContainer';
import usePopularMovies from '../hooks/usePopularMovies';
import useNowPlayingMovies from '../hooks/useNowPlayingMovies';
import GptSearch from './GptSearch';
import { useSelector } from 'react-redux';

const Browse = () => {
const showGptSearch = useSelector(store => store.gpt.showGptSearch)
useNowPlayingMovies();
usePopularMovies()
  return (
    <div>
      <HeaderComponent />
      {showGptSearch ? (<GptSearch />) : (<> <MainContainer />
      <SecondaryContainer /></>)}
      
     

      {/* MainContainer
           - VideoBG
           - VideoTitle
           SecondaryContainer
            -MovieList*n
            -cards * n
    
     */}
    </div>
  );
}

export default Browse