import { getMovieListByGenre } from '@/lib/tmdb'
import { getGenreName } from '@/lib/constants/genres'
import GenreMovieListContainer from '@/components/GenreMovieListContainer'

interface GenrePageProps {
  params: Promise<{
    id: string
  }>
}

export default async function GenrePage({ params }: GenrePageProps) {
  const { id } = await params
  const genreId = parseInt(id)
  const movieList = await getMovieListByGenre(genreId)
  const genreName = getGenreName(genreId)

  return (
    <main className='container mx-auto px-4 py-8'>
      <h1 className='text-4xl font-bold mb-8 text-center md:text-left'>
        <span className='text-secondary'>{genreName}</span>類型電影
      </h1>
      <div className='mt-8'>
        {movieList?.results.length ? (
          <>
            <p className='text-gray-500 text-center md:text-right mb-4'>
              {movieList.total_results} 部「{genreName}」類型的電影
            </p>
            <GenreMovieListContainer
              initialMovies={movieList.results}
              totalPages={movieList.total_pages}
              genreId={genreId}
            />
          </>
        ) : (
          <p className='text-gray-500'>找不到「{id}」類型的電影</p>
        )}
      </div>
    </main>
  )
}
