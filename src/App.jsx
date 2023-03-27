import { useContext, useEffect, useState } from 'react'
import { Routes, Route, createSearchParams, useSearchParams, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import 'reactjs-popup/dist/index.css'
import { fetchMovies } from './data/moviesSlice'
import { ENDPOINT_SEARCH, ENDPOINT_DISCOVER, ENDPOINT, API_KEY } from './constants'
import Header from './components/Header'
import Movies from './components/Movies'
import Starred from './components/Starred'
import WatchLater from './components/WatchLater'
import YouTubePlayer from './components/YoutubePlayer'
import './app.scss'
import Modal from './components/Modal/Modal'
import { ModalContext } from './contexts/ModalContext'

const App = () => {

  const state = useSelector((state) => state)
  const { movies } = state  
  const dispatch = useDispatch()
  const [searchParams, setSearchParams] = useSearchParams()
  const searchQuery = searchParams.get('search')
  const [videoKey, setVideoKey] = useState()
  const navigate = useNavigate()
  const { isModalOpen, openModal } = useContext(ModalContext);

  const getSearchResults = (query) => {
    if (query !== '') {
      dispatch(fetchMovies({ apiUrl: ENDPOINT_SEARCH, query }))
      setSearchParams(createSearchParams({ search: query }))
    } else {
      dispatch(fetchMovies({ apiUrl: ENDPOINT_DISCOVER }))
      setSearchParams()
    }
  }

  const searchMovies = (query) => {
    navigate('/')
    getSearchResults(query)
  }

  const getMovies = (page) => {
    if (searchQuery) {
        dispatch(fetchMovies({ apiUrl: ENDPOINT_SEARCH, query: searchQuery, page }))
    } else {
        dispatch(fetchMovies({ apiUrl: ENDPOINT_DISCOVER, query: undefined, page }))
    }
  }

  const viewTrailer = (movie) => {
    getMovie(movie.id)
  }

  const getMovie = async (id) => {
    const URL = `${ENDPOINT}/movie/${id}?api_key=${API_KEY}&append_to_response=videos`

    setVideoKey(null)
    const videoData = await fetch(URL)
      .then((response) => response.json())

    if (videoData.videos && videoData.videos.results.length) {
      const trailer = videoData.videos.results.find(vid => vid.type === 'Trailer')
      setVideoKey(trailer ? trailer.key : videoData.videos.results[0].key)
    }
    openModal();
  }

  useEffect(() => {
    getMovies()
  }, [])

  return (
    <div className="App">
      {isModalOpen && videoKey && (
          <Modal>
            <YouTubePlayer videoKey={videoKey}/>
          </Modal>
        )}
      <Header searchMovies={searchMovies} searchParams={searchParams} setSearchParams={setSearchParams} />
      <div className="container">
        <Routes>
          <Route path="/" element={<Movies movies={movies.movies.results || []} viewTrailer={viewTrailer} onEndReach={getMovies} />} />
          <Route path="/starred" element={<Starred viewTrailer={viewTrailer} />} />
          <Route path="/watch-later" element={<WatchLater viewTrailer={viewTrailer} />} />
          <Route path="*" element={<h1 className="not-found">Page Not Found</h1>} />
        </Routes>
      </div>
    </div>
  )
}

export default App
