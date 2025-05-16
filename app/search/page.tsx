import { searchMovies } from '@/lib/tmdb'
import SearchBar from '@/components/SearchBar'
import SearchMovieListContainer from '@/components/SearchMovieListContainer'

interface SearchPageProps {
  searchParams: Promise<{ q: string }>
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q } = await searchParams
  const searchResults = q ? await searchMovies(q) : null
  const movies = searchResults?.results || []

  return (
    <main className='container mx-auto px-4 py-8'>
      <h1 className='text-4xl font-bold mb-8 text-center'>搜尋結果</h1>
      <SearchBar initialQuery={q} />

      {q ? (
        <div className='mt-8'>
          {movies.length > 0 ? (
            <>
              <p className='text-gray-500 mb-4 text-right'>
                找到 {searchResults?.total_results} 部與「{q}」相關的電影
              </p>
              <SearchMovieListContainer
                keyword={q}
                initialMovies={movies}
                totalPages={searchResults?.total_pages || 0}
              />
            </>
          ) : (
            <p className='text-gray-500'>找不到與「{q}」相關的電影</p>
          )}
        </div>
      ) : (
        <p className='text-gray-500 mt-8'>請輸入搜尋關鍵字</p>
      )}
    </main>
  )
}
