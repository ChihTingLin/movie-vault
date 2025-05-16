'use client'

import {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from 'react'
import { Movie } from '@/types/movie'
import { getMovieDetails } from '@/lib/tmdb'

interface WatchlistContextType {
  watchlist: { id: number; added_at: string }[]
  addToWatchlist: (movieId: number) => void
  removeFromWatchlist: (movieId: number) => void
  isInWatchlist: (movieId: number) => boolean
  getWatchlistDetails: () => Promise<void>
  movieDetails: Movie[]
  loading: boolean
}

const WatchlistContext = createContext<WatchlistContextType | undefined>(
  undefined
)

export function WatchlistProvider({ children }: { children: ReactNode }) {
  const [watchlist, setWatchlist] = useState<
    { id: number; added_at: string }[]
  >(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('watchlist')
      return saved ? JSON.parse(saved) : []
    }
    return []
  })
  const [movieDetails, setMovieDetails] = useState<Movie[]>([])
  const [loading, setLoading] = useState(false)
  const addToWatchlist = useCallback((movieId: number) => {
    setWatchlist(prev => {
      const newWatchlist = [
        ...prev,
        { id: movieId, added_at: new Date().toISOString() },
      ]
      localStorage.setItem('watchlist', JSON.stringify(newWatchlist))
      return newWatchlist
    })
    getWatchlistDetails()
  }, [])

  const removeFromWatchlist = useCallback((movieId: number) => {
    setWatchlist(prev => {
      const newWatchlist = prev.filter(m => m.id !== movieId)
      localStorage.setItem('watchlist', JSON.stringify(newWatchlist))
      return newWatchlist
    })
    getWatchlistDetails()
  }, [])

  const isInWatchlist = useCallback(
    (movieId: number) => {
      return watchlist.some(movie => movie.id === movieId)
    },
    [watchlist]
  )

  const getWatchlistDetails = useCallback(async () => {
    try {
      const watchlist = JSON.parse(localStorage.getItem('watchlist') || '[]')
      const movieDetails = await Promise.all(
        watchlist.map(async (movie: { id: number; added_at: string }) => {
          const detail = await getMovieDetails(movie.id)
          return { ...detail, added_at: movie.added_at }
        })
      )
      setMovieDetails(movieDetails)
    } catch (error) {
      console.error('Error loading watchlist:', error)
    } finally {
      setLoading(false)
    }
  }, [watchlist])

  return (
    <WatchlistContext.Provider
      value={{
        watchlist,
        addToWatchlist,
        removeFromWatchlist,
        isInWatchlist,
        getWatchlistDetails,
        movieDetails,
        loading,
      }}
    >
      {children}
    </WatchlistContext.Provider>
  )
}

export function useWatchlist() {
  const context = useContext(WatchlistContext)
  if (context === undefined) {
    throw new Error('useWatchlist must be used within a WatchlistProvider')
  }
  return context
}
