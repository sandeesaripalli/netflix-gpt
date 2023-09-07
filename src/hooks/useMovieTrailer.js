import { useCallback, useEffect } from "react"
import { API_OPTIONS } from "../utils/constants"
import { useDispatch } from "react-redux"
import { addTrailerVideo } from "../utils/moviesSlice"

const useMovieTrailer = (movieId) =>{
    const dispatch = useDispatch()
   
    const getMovieTrailer = useCallback(async() =>{
        const data = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`, API_OPTIONS)
        const json = await data.json();

        const filteredData = json.results.filter((video)=>video.type ==="Trailer")
        const trailer = filteredData.length ? filteredData[0] :json.results[0]
        
        dispatch(addTrailerVideo(trailer))

    }, [dispatch, movieId])

    useEffect(() =>{
        getMovieTrailer()
    },[getMovieTrailer])
}

export default useMovieTrailer;