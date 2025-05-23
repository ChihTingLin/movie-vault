'use client'

import { Movie } from '@/types/movie'
import MovieCard from '@/components/MovieCard'
import MovieFilter from './MovieSorting'
import { useState, useEffect } from 'react'
import { sortMovies } from '@/lib/utils'
import { useWatchlist } from '@/contexts/WatchlistContext'
import MovieRoulette from './MovieRoulette'

export default function WatchlistContainer() {
  const { movieDetails, loading, getWatchlistDetails } = useWatchlist()
  const [selectedSorting, setSelectedSorting] = useState<{
    label: string
    value: string
  }>({
    label: '收藏時間 (由新到舊)',
    value: 'added_at_latest',
  })
  const [sortedMovies, setSortedMovies] = useState<Movie[]>([])

  const handleSortingChange = (sorting: { label: string; value: string }) => {
    setSelectedSorting(sorting)
    setSortedMovies(movies => sortMovies(movies, sorting.value))
  }

  useEffect(() => {
    getWatchlistDetails().then(() => {
      setSortedMovies(movieDetails)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getWatchlistDetails, setSortedMovies])

  useEffect(() => {
    setSortedMovies(sortMovies(movieDetails, selectedSorting.value))
  }, [movieDetails, selectedSorting])

  return (
    <>
      {loading && (
        <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto' />
      )}
      {!loading && movieDetails.length === 0 && (
        <p className='text-center'>您的待看清單目前是空的。</p>
      )}
      <div className='flex justify-between items-center mb-4'>
        <div>
          {!loading && movieDetails.length > 0 && (
            <MovieRoulette movies={movieDetails} />
          )}
        </div>
        {sortMovies.length > 0 && (
          <MovieFilter
            selectedSorting={selectedSorting}
            onSortingChange={handleSortingChange}
          />
        )}
      </div>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6'>
        {sortedMovies.map(movie => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </>
  )
}
