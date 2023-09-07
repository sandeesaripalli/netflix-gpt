import React from 'react'
import HeaderComponent from './HeaderComponent'
import useNowPlayingMovies from '../hooks/useNowPlayingMovies'
import MainContainer from './MainContainer';
import SecondaryContainer from './SecondaryContainer';

const Browse = () => {

useNowPlayingMovies();
  return (
    <div>
      <HeaderComponent />
      <MainContainer />
      <SecondaryContainer />

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