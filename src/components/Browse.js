import React from 'react'
import HeaderComponent from './HeaderComponent'

import MainContainer from './MainContainer';
import SecondaryContainer from './SecondaryContainer';
import usePopularMovies from '../hooks/usePopularMovies';
import useNowPlayingMovies from '../hooks/useNowPlayingMovies';

const Browse = () => {

useNowPlayingMovies();
usePopularMovies()
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