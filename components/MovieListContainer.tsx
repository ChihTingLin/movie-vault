'use client'

import { Movie } from '@/types/movie'
import { getMovieList } from '@/lib/tmdb'
import MovieGrid from './MovieGrid'

interface MovieListContainerProps {
  initialMovies: Movie[]
  totalPages: number
}

export default function MovieListContainer({
  initialMovies,
  totalPages,
}: MovieListContainerProps) {
  const handleLoadMore = async (page: number) => {
    return await getMovieList(page)
  }

  return (
    <MovieGrid
      initialMovies={initialMovies}
      totalPages={totalPages}
      onLoadMore={handleLoadMore}
    />
  )
}
