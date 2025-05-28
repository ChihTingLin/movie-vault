import {
  MovieListSchema,
  MovieDetailSchema,
  MovieReviewListSchema,
} from '@/types/movie'

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
  const data = await response.json()
  const parsed = MovieListSchema.safeParse(data)
  if (!parsed.success) {
    throw new Error('Invalid movie data')
  }
  return parsed.data
}

export async function searchMovies(query: string, page = 1) {
  const response = await fetchWithToken(
    `/search/movie?query=${encodeURIComponent(
      query
    )}&page=${page}&language=zh-TW`
  )
  if (!response.ok) {
    throw new Error('Failed to fetch movies')
  }
  const data = await response.json()
  const parsed = MovieListSchema.safeParse(data)
  if (!parsed.success) {
    throw new Error('Invalid movie data')
  }
  return parsed.data
}

export async function getMovieDetails(id: number) {
  const response = await fetchWithToken(
    `/movie/${id}?append_to_response=credits,videos&language=zh-TW`
  )

  if (!response.ok) {
    throw new Error('Failed to fetch movie details')
  }

  const data = await response.json()
  const parsed = MovieDetailSchema.safeParse(data)
  if (!parsed.success) {
    throw new Error('Invalid movie data')
  }
  return parsed.data
}

export async function getMovieReviews(id: number) {
  const response = await fetchWithToken(`/movie/${id}/reviews`)
  const data = await response.json()
  const parsed = MovieReviewListSchema.safeParse(data)
  console.log(data, parsed)
  if (!parsed.success) {
    throw new Error('Invalid movie data')
  }
  return parsed.data
}

export async function getPopularMovies(page = 1) {
  const response = await fetchWithToken(
    `/movie/popular?&page=${page}&language=zh-TW`
  )
  if (!response.ok) {
    throw new Error('Failed to fetch popular movies')
  }
  const data = await response.json()
  const parsed = MovieListSchema.safeParse(data)
  if (!parsed.success) {
    throw new Error('Invalid movie data')
  }
  return parsed.data
}
