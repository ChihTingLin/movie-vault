import Image from 'next/image'
import { getMovieDetails, getMovieReviews } from '@/lib/tmdb'
import WatchlistButton from '@/components/WatchlistButton'
import MovieReview from '@/components/MovieReview'

interface MoviePageProps {
  params: Promise<{
    id: string
  }>
}

export default async function MoviePage({ params }: MoviePageProps) {
  const { id } = await params
  const movie = await getMovieDetails(parseInt(id))
  const reviews = await getMovieReviews(parseInt(id))
  const directors = movie.credits.crew.filter(
    person => person.job === 'Director'
  )

  return (
    <main>
      <div className='relative h-[50vh] w-full'>
        <Image
          src={
            movie.backdrop_path
              ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
              : '/images/placeholder-backdrop.svg'
          }
          alt={movie.title}
          fill
          sizes='100vw'
          className='object-cover'
          priority
        />
        <div className='absolute inset-0 bg-gradient-to-t from-background to-background/20' />
      </div>

      <div className='container mx-auto px-4 py-8'>
        <div className='flex flex-col md:flex-row gap-8 -mt-32 relative'>
          <div className='w-64 flex-shrink-0'>
            <div className='aspect-[2/3] relative rounded-lg overflow-hidden'>
              <Image
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                    : '/images/placeholder-poster.svg'
                }
                alt={movie.title}
                fill
                sizes='(max-width: 768px) 100vw, 256px'
                className='object-cover'
                priority={true}
              />
            </div>
          </div>

          <div className='flex-1'>
            <div className='flex items-center gap-4'>
              <h1 className='text-4xl font-bold md:text-white md:text-shadow-sm md:text-shadow-black'>
                {movie.title}
              </h1>
              <WatchlistButton movieId={movie.id} />
            </div>

            {movie.tagline && (
              <p className='text-lg md:text-white md:text-shadow-sm md:text-shadow-black mt-2'>
                {movie.tagline}
              </p>
            )}

            <div className='mt-4 flex gap-2'>
              {movie.genres.map(genre => (
                <span
                  key={genre.id}
                  className='px-3 py-1 bg-secondary text-white rounded-full text-sm'
                >
                  {genre.name}
                </span>
              ))}
            </div>

            <div className='mt-8'>
              <h2 className='text-2xl font-semibold mb-4'>劇情簡介</h2>
              <p className='text-gray-400'>{movie.overview}</p>
            </div>

            {movie.videos.results.length > 0 && (
              <div className='mt-8'>
                <h2 className='text-2xl font-semibold mb-4'>預告片</h2>
                <div className='aspect-video w-full max-w-2xl'>
                  <iframe
                    width='100%'
                    height='100%'
                    src={`https://www.youtube.com/embed/${movie.videos.results[0].key}`}
                    title='YouTube video player'
                    allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                    allowFullScreen
                  />
                </div>
              </div>
            )}

            {movie.credits.cast.length > 0 && (
              <div className='mt-8'>
                <h2 className='text-2xl font-semibold mb-4'>演員陣容</h2>
                <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4'>
                  {movie.credits.cast.slice(0, 6).map(person => (
                    <div key={person.id} className='text-center'>
                      <div className='aspect-[2/3] relative rounded-lg overflow-hidden mb-2 bg-gray-200'>
                        <Image
                          src={
                            person.profile_path
                              ? `https://image.tmdb.org/t/p/w185${person.profile_path}`
                              : '/images/placeholder-avatar.svg'
                          }
                          alt={person.name}
                          fill
                          sizes='(max-width: 768px) 50vw, (max-width: 1024px) 25vw, 16.67vw'
                          className='object-cover'
                        />
                      </div>
                      <p className='font-medium'>{person.name}</p>
                      <p className='text-sm text-gray-400'>
                        {person.character}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {directors.length > 0 && (
              <div className='mt-8'>
                <h2 className='text-2xl font-semibold mb-4'>導演</h2>
                <p className='text-gray-400'>
                  {directors.map(director => director.name).join(', ')}
                </p>
              </div>
            )}

            {reviews.results.length > 0 && (
              <div className='mt-8'>
                <h2 className='text-2xl font-semibold mb-4'>影評</h2>
                <div>
                  {reviews.results.map(review => (
                    <MovieReview key={review.id} review={review} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
