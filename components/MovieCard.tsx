'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Movie } from '@/types/movie'
import WatchlistButton from './WatchlistButton'
import { shimmer, toBase64 } from '@/lib/utils'
import { useMemo } from 'react'
import clsx from 'clsx'

interface MovieCardProps {
  movie: Movie
}

export default function MovieCard({ movie }: MovieCardProps) {
  const blurDataURL = useMemo(
    () => `data:image/svg+xml;base64,${toBase64(shimmer(500, 750))}`,
    []
  )
  const vote = Math.floor(movie.vote_average * 10)
  return (
    <div className='relative group rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow'>
      <Link href={`/movie/${movie.id}`}>
        <div className='aspect-[2/3] relative'>
          <Image
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w400${movie.poster_path}`
                : '/images/placeholder-poster.svg'
            }
            alt={movie.title}
            fill
            sizes='(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw'
            className='object-cover'
            placeholder='blur'
            blurDataURL={blurDataURL}
            onError={e => {
              const target = e.target as HTMLImageElement
              target.src = '/images/placeholder-poster.svg'
            }}
          />
        </div>
        <div className='p-6 relative'>
          <div
            className={clsx(
              'rounded-full w-10 h-10 bg-gray-800 flex items-center justify-center absolute top-[-20px] left-2 text-sm font-bold border border-3',
              {
                'text-green-500': vote >= 70,
                'text-yellow-500': vote < 70 && vote > 0,
                'text-white': vote === 0,
                'border-green-500': vote >= 70,
                'border-yellow-500': vote < 70 && vote > 0,
                'border-white': vote === 0,
              }
            )}
          >
            {vote !== 0 ? (
              <span>
                {vote}
                <span className='text-xs scale-50'>%</span>
              </span>
            ) : (
              'NR'
            )}
          </div>
          <h3 className='font-semibold text-lg truncate'>{movie.title}</h3>
          <p className='text-sm text-gray-500'>{movie.release_date}</p>
        </div>
      </Link>
      <div className='absolute top-2 right-2'>
        <WatchlistButton movieId={movie.id} />
      </div>
    </div>
  )
}
