import SearchBar from '@/components/SearchBar'
import { getMovieList } from '@/lib/tmdb'
import GenreList from '@/components/GenreList'
import MovieListContainer from '@/components/MovieListContainer'

export default async function Home() {
  const movieList = await getMovieList()

  return (
    <main className='container mx-auto px-4 py-8'>
      <SearchBar />
      <GenreList />
      <div className='mt-8'>
        <MovieListContainer
          initialMovies={movieList.results}
          totalPages={movieList.total_pages}
        />
      </div>
    </main>
  )
}
