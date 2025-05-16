import { Movie, MovieDetail, MovieReviewList } from '@/types/movie'

const BASE_URL = 'https://api.themoviedb.org/3'

function fetchWithToken(endpoint: string) {
  return fetch(`${BASE_URL}${endpoint}`, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN}`,
    },
  })
}

export async function getMovieList(page = 1) {
  const response = await fetchWithToken(
    `/discover/movie?page=${page}&language=zh-TW`
  )
  return response.json()
}

export async function getMovieListByGenre(genreId: number, page = 1) {
  const response = await fetchWithToken(
    `/discover/movie?with_genres=${genreId}&page=${page}`
  )
  return response.json()
}

export async function searchMovies(
  query: string,
  page = 1
): Promise<{
  page: number
  results: Movie[]
  total_pages: number
  total_results: number
}> {
  const response = await fetchWithToken(
    `/search/movie?query=${encodeURIComponent(
      query
    )}&page=${page}&language=zh-TW`
  )

  if (!response.ok) {
    throw new Error('Failed to fetch movies')
  }

  return response.json()
}

export async function getMovieDetails(id: number): Promise<MovieDetail> {
  const response = await fetchWithToken(
    `/movie/${id}?append_to_response=credits,videos&language=zh-TW`
  )

  if (!response.ok) {
    throw new Error('Failed to fetch movie details')
  }

  return response.json()
}

export async function getMovieReviews(id: number): Promise<MovieReviewList> {
  const response = await fetchWithToken(`/movie/${id}/reviews`)
  return response.json()
}

export async function getPopularMovies(page = 1): Promise<{
  results: Movie[]
  total_pages: number
  total_results: number
}> {
  const response = await fetchWithToken(
    `/movie/popular?&page=${page}&language=zh-TW`
  )

  if (!response.ok) {
    throw new Error('Failed to fetch popular movies')
  }

  return response.json()
}
