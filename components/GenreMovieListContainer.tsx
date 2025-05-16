'use client'

import { Movie } from '@/types/movie'
import { getMovieListByGenre } from '@/lib/tmdb'
import MovieGrid from './MovieGrid'

interface GenreMovieListContainerProps {
  initialMovies: Movie[]
  totalPages: number
  genreId: number
}

export default function GenreMovieListContainer({
  initialMovies,
  totalPages,
  genreId,
}: GenreMovieListContainerProps) {
  const handleLoadMore = async (page: number) => {
    return await getMovieListByGenre(genreId, page)
  }

  return (
    <MovieGrid
      initialMovies={initialMovies}
      totalPages={totalPages}
      onLoadMore={handleLoadMore}
    />
  )
}
