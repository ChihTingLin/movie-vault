'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export default function SearchBar({ initialQuery = '' }) {
  const [query, setQuery] = useState(initialQuery)
  const router = useRouter()

  const handleSearch = () => {
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  return (
    <div className='w-full max-w-xl mx-auto flex gap-2'>
      <Input
        type='search'
        placeholder='搜尋電影...'
        value={query}
        onChange={e => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        className='w-full'
        inputSize='lg'
      />
      <Button type='button' onClick={handleSearch} size='lg'>
        搜尋
      </Button>
    </div>
  )
}
