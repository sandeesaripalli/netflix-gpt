import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import lang from '../utils/languageConstants'
import openai from '../utils/openai'
import { API_OPTIONS } from '../utils/constants'
import { addGptMovieResult } from '../utils/gptSlice'

const GptSearchBar = () => {
  const dispatch = useDispatch()
  const searchText = useRef(null)
    const langKey = useSelector(store => store.config.lang)
    //search movie in tmdb

    const searchMovieTMBD = async (movie) =>{
      const data = await fetch("https://api.themoviedb.org/3/search/movie?query="+ movie + "&include_adult=false&language=en-US&page=1", API_OPTIONS);
      const json = await data.json();
      return json.results
    }
    const handleGPTSearchClick = async () =>{
      console.log(searchText.current.value);
      // Make an api call to GPT APi and get the movie results
      const gptQuery = "Act as a Movie Recommendation system and suggest some movies for the query : " +
      searchText.current.value +
      ". only give me names of 5 movies, comma seperated like the example result given ahead. Example Result: Gadar, Sholay, Don, Golmaal, Koi Mil Gaya";
      const gptResults = await openai.chat.completions.create({
        messages: [{ role: 'user', content: gptQuery }],
        model: 'gpt-3.5-turbo',
      });
      
      const gptMovies = gptResults.choices?.[0]?.message?.content.split(',')

      //Now search all the movies in TMBD api
        const promiseArray = gptMovies.map((movie) =>searchMovieTMBD(movie) )

        //as searchMovieTMBD is async function results will be a array of promises which have to be resolved to get Data
          const tmdbResults = await Promise.all(promiseArray);

          console.log(tmdbResults)

          //we can dispatch an action which will push the tmdbResults to redux store
          //dispatch(addGptMovieResult(tmdbResults))
          dispatch(addGptMovieResult({movieNames: gptMovies, movieResults:tmdbResults}))
    }
  return (
    <div className='pt-[8%] flex justify-center'>
    <form className='w-1/2 bg-black grid grid-cols-12' onSubmit={(e)=>{
      e.preventDefault()
    }}>
        <input ref = {searchText} type="text" className="col-span-9 p-4 m-4" placeholder = {lang[langKey].gptSearchPlaceholder} />
        <button className='col-span-3 m-4 py-2 px-4 bg-red-700 text-white rounded-lg' onClick={handleGPTSearchClick}>{lang[langKey].search}</button>
    </form></div>
  )
}

export default GptSearchBar