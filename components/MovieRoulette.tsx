'use client'

import { useState } from 'react'
import { Movie } from '@/types/movie'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from './ui/dialog'

interface MovieRouletteProps {
  movies: Movie[]
}

export default function MovieRoulette({ movies }: MovieRouletteProps) {
  const [isSpinning, setIsSpinning] = useState(false)
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null)

  const spinRoulette = () => {
    if (isSpinning || movies.length === 0) return

    setIsSpinning(true)
    setSelectedMovie(null)

    // 隨機選擇停止的時間（2-4秒之間）
    const spinDuration = 2000 + Math.random() * 2000

    // 在動畫過程中快速切換顯示的電影
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * movies.length)
      setSelectedMovie(movies[randomIndex])
    }, 100)

    // 停止動畫
    setTimeout(() => {
      clearInterval(interval)
      const finalMovie = movies[Math.floor(Math.random() * movies.length)]
      setSelectedMovie(finalMovie)
      setIsSpinning(false)
    }, spinDuration)
  }

  return (
    <Dialog>
      <DialogTrigger>
        <a
          onClick={spinRoulette}
          className='px-4 py-2.5 bg-primary text-primary-foreground rounded-full 
                  hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed mr-4'
        >
          隨機選片
        </a>
      </DialogTrigger>
      <DialogContent className='bg-white text-center'>
        <DialogTitle>隨機選片</DialogTitle>

        <div className='relative w-48 h-72 bg-muted rounded-lg overflow-hidden mx-auto'>
          <AnimatePresence mode='wait'>
            {selectedMovie && (
              <motion.div
                key={selectedMovie.id}
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -100, opacity: 0 }}
                transition={{ duration: isSpinning ? 0.1 : 0.5 }}
                className='absolute inset-0'
              >
                <Image
                  src={`https://image.tmdb.org/t/p/w500${selectedMovie.poster_path}`}
                  alt={selectedMovie.title}
                  fill
                  className='object-cover'
                  sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                />
                {!isSpinning && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className='absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent'
                  >
                    <Link
                      href={`/movie/${selectedMovie.id}`}
                      className='text-white text-sm font-semibold truncate'
                    >
                      {selectedMovie.title}
                    </Link>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </DialogContent>
    </Dialog>
  )
}
