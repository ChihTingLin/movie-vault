'use client'

import { useEffect, useRef, useState } from 'react'
import { Movie } from '@/types/movie'
import MovieCard from './MovieCard'
import { MovieList } from '@/types/movie'
import MovieSorting from './MovieSorting'
import { sortMovies } from '@/lib/utils'

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
  const [sorting, setSorting] = useState<{ label: string; value: string }>({
    label: '上映時間 (由新到舊)',
    value: 'release_date_latest',
  })
  const pageRef = useRef(1)
  const [isLoading, setIsLoading] = useState(false)
  const observerTarget = useRef<HTMLDivElement>(null)

  const initialLoading = async () => {
    const pageResults = await Promise.all(
      Array.from({ length: totalPages >= 3 ? 2 : 1 }).map(async (_, index) => {
        const page = await onLoadMore(index + 2)
        pageRef.current = index + 2
        return page.results
      })
    )
    setMovies(prev =>
      sortMovies([...prev, ...pageResults.flat()], sorting.value)
    )
  }

  const handleSortingChange = (option: { value: string; label: string }) => {
    setSorting(option)
    setMovies(prev => sortMovies(prev, option.value))
  }

  useEffect(() => {
    setMovies(initialMovies)
    pageRef.current = 1
    if (totalPages > 1) {
      initialLoading()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
            setMovies(prev =>
              sortMovies([...prev, ...response.results], sorting.value)
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
      <div className='grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-4'>
        {movies?.map((movie, i) => (
          <MovieCard key={`${movie.id}-${i}`} movie={movie} />
        ))}
      </div>

      <div
        ref={observerTarget}
        className='h-20 flex items-center justify-center'
      >
        {isLoading && (
          <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-primary' />
        )}
      </div>
    </>
  )
}
