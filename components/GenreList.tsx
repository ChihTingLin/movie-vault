import { movieGenres } from '@/lib/constants/genres'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function GenreList() {
  return (
    <div className='mt-4'>
      <div className='w-full overflow-x-scroll'>
        <div className='w-max flex gap-2'>
          {movieGenres.map(genre => (
            <Button key={genre.id} variant='secondary' className='rounded-full'>
              <Link href={`/genre/${genre.id}`}>{genre.name}</Link>
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}
