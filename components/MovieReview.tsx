'use client'
import { MovieReview as MovieReviewType } from '@/types/movie'
import { Button } from './ui/button'
import { useState } from 'react'
import clsx from 'clsx'

export default function MovieReview({ review }: { review: MovieReviewType }) {
  const [isExpanded, setIsExpanded] = useState(false)
  return (
    <div className='border border-gray-200 shadow-sm rounded-md p-4 mb-4'>
      <div>{review.author}</div>
      <div
        className={clsx('text-gray-400 line-clamp-3', {
          'line-clamp-none': isExpanded,
        })}
      >
        {review.content}
      </div>
      <div className='flex justify-end'>
        <Button
          size='sm'
          variant='link'
          className='text-sm cursor-pointer'
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? '收起' : '展開'}
        </Button>
      </div>
    </div>
  )
}
