'use client'

import { searchMovies } from '@/lib/tmdb'
import MovieGrid from './MovieGrid'
import { Movie } from '@/types/movie'

interface SearchMovieListContainerProps {
  keyword: string
  initialMovies: Movie[]
  totalPages: number
}

export default function SearchMovieListContainer({
  keyword,
  initialMovies,
  totalPages,
}: SearchMovieListContainerProps) {
  const handleLoadMore = async (page: number) => {
    return await searchMovies(keyword, page)
  }

  return (
    <MovieGrid
      initialMovies={initialMovies}
      totalPages={totalPages}
      onLoadMore={handleLoadMore}
    />
  )
}
