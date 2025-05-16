'use client'

import { Button } from './ui/button'
import Image from 'next/image'
import { useWatchlist } from '@/contexts/WatchlistContext'
interface WatchlistButtonProps {
  movieId: number
}

export default function WatchlistButton({ movieId }: WatchlistButtonProps) {
  const { isInWatchlist, addToWatchlist, removeFromWatchlist } = useWatchlist()
  const inWatchlist = isInWatchlist(movieId)

  const toggleWatchlist = () => {
    if (isInWatchlist(movieId)) {
      removeFromWatchlist(movieId)
    } else {
      addToWatchlist(movieId)
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
