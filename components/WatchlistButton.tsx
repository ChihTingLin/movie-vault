'use client'

import { Button } from './ui/button'
import Image from 'next/image'
import useWatchlistStore from '@/lib/store/watchlistStore'
import { Movie } from '@/types/movie'

interface WatchlistButtonProps {
  movie: Movie
}

export default function WatchlistButton({ movie }: WatchlistButtonProps) {
  const { isInWatchlist, addToWatchlist, removeFromWatchlist } =
    useWatchlistStore()
  const inWatchlist = isInWatchlist(movie.id)

  const toggleWatchlist = () => {
    if (isInWatchlist(movie.id)) {
      removeFromWatchlist(movie.id)
    } else {
      addToWatchlist(movie)
    }
  }
  return (
    <Button
      variant='ghost'
      size='icon'
      onClick={toggleWatchlist}
      className='bg-white/80 hover:bg-white'
    >
      {inWatchlist ? (
        <Image
          src='/images/bookmark-marked.svg'
          alt='remove from watchlist'
          width={20}
          height={20}
        />
      ) : (
        <Image
          src='/images/bookmark.svg'
          alt='add to watchlist'
          width={20}
          height={20}
        />
      )}
    </Button>
  )
}
