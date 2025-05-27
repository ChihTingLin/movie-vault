'use client'

import { Movie } from '@/types/movie'
import MovieCard from '@/components/MovieCard'
import MovieFilter from './MovieSorting'
import { useState, useEffect, useMemo } from 'react'
import { sortMovies } from '@/lib/utils'
import MovieRoulette from './MovieRoulette'
import useWatchlistStore from '@/lib/store/watchlistStore'

export default function WatchlistContainer() {
  const { watchlist, loading, getWatchlistDetails, detailsMap } =
    useWatchlistStore()
  const [selectedSorting, setSelectedSorting] = useState<{
    label: string
    value: string
  }>({
    label: '收藏時間 (由新到舊)',
    value: 'added_at_latest',
  })
  const [sortedMovies, setSortedMovies] = useState<Movie[]>([])
  const movies = useMemo(
    () => watchlist.map(m => ({ ...m, ...detailsMap[m.id] })),
    [watchlist, detailsMap]
  )
  const originalMovieIds = watchlist.map(m => m.id)

  const handleSortingChange = (sorting: { label: string; value: string }) => {
    setSelectedSorting(sorting)
    setSortedMovies(sortMovies(movies, sorting.value, originalMovieIds))
  }

  useEffect(() => {
    getWatchlistDetails()
  }, [getWatchlistDetails, setSortedMovies])

  useEffect(() => {
    setSortedMovies(sortMovies(movies, selectedSorting.value, originalMovieIds))
  }, [movies, selectedSorting, originalMovieIds])

  return (
    <>
      {loading && (
        <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto' />
      )}
      {!loading && sortedMovies.length === 0 && (
        <p className='text-center'>您的待看清單目前是空的。</p>
      )}
      <div className='flex justify-between items-center mb-4'>
        <div>
          {!loading && sortedMovies.length > 0 && (
            <MovieRoulette movies={sortedMovies} />
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
