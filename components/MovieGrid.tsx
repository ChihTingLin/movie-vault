'use client'

import { useEffect, useRef, useState } from 'react'
import { Movie } from '@/types/movie'
import MovieCard from './MovieCard'
import { MovieList } from '@/types/movie'
import MovieSorting from './MovieSorting'
import { sortMovies, removeDuplicateMovies } from '@/lib/utils'
import { options } from '@/lib/constants/sorting'

interface MovieGridProps {
  initialMovies: Movie[]
  totalPages: number
  onLoadMore: (page: number) => Promise<MovieList>
}

export default function MovieGrid({
  initialMovies,
  totalPages = 0,
  onLoadMore,
}: MovieGridProps) {
  const [movies, setMovies] = useState<Movie[]>(initialMovies || [])
  const [originalMovieIds, setOriginalMovieIds] = useState<number[]>(
    initialMovies.map(m => m.id) || []
  )
  const [sorting, setSorting] = useState<{ label: string; value: string }>(
    options[0]
  )
  const pageRef = useRef(1)
  const [isLoading, setIsLoading] = useState(false)
  const observerTarget = useRef<HTMLDivElement>(null)

  const handleSortingChange = (option: { value: string; label: string }) => {
    setSorting(option)
    const newMovies = sortMovies(
      removeDuplicateMovies(movies),
      option.value,
      originalMovieIds
    )
    setMovies(newMovies)
  }

  useEffect(() => {
    setMovies(initialMovies)
    setOriginalMovieIds(initialMovies.map(m => m.id))
    pageRef.current = 1
  }, [initialMovies])

  useEffect(() => {
    const observer = new IntersectionObserver(
      async entries => {
        if (
          entries[0].isIntersecting &&
          pageRef.current < totalPages &&
          !isLoading
        ) {
          setIsLoading(true)
          try {
            const nextPage = pageRef.current + 1
            const response: MovieList = await onLoadMore(nextPage)
            setOriginalMovieIds([
              ...originalMovieIds,
              ...response.results.map(m => m.id),
            ])
            setMovies(prev =>
              sortMovies(
                removeDuplicateMovies([...prev, ...response.results]),
                sorting.value
              )
            )
            pageRef.current = nextPage
          } catch (error) {
            console.error('Failed to load more movies:', error)
          } finally {
            setIsLoading(false)
          }
        }
      },
      { threshold: 1.0 }
    )

    if (observerTarget.current) {
      observer.observe(observerTarget.current)
    }

    return () => observer.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onLoadMore])

  return (
    <>
      <div className='flex justify-end mb-4'>
        <MovieSorting
          selectedSorting={sorting}
          onSortingChange={handleSortingChange}
        />
      </div>
      <div
        className='grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-4'
        data-testid='movie-grid'
      >
        {movies?.map((movie, i) => (
          <MovieCard key={`${movie.id}-${i}`} movie={movie} />
        ))}
      </div>

      <div
        ref={observerTarget}
        className='h-20 flex items-center justify-center'
        data-testid='movie-loading-trigger'
      >
        {isLoading && (
          <div
            className='animate-spin rounded-full h-8 w-8 border-b-2 border-primary'
            data-testid='movie-loading'
          />
        )}
      </div>
    </>
  )
}
