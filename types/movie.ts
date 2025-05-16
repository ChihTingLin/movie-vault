export interface Movie {
  adult: boolean
  backdrop_path: string
  genre_ids: number[]
  id: number
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string
  release_date: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
  added_at?: string
}

export interface MovieDetail extends Movie {
  genres: {
    id: number
    name: string
  }[]
  runtime: number
  status: string
  tagline: string
  production_companies: {
    id: number
    name: string
    logo_path: string | null
    origin_country: string
  }[]
  credits: {
    cast: {
      id: number
      name: string
      character: string
      profile_path: string | null
    }[]
    crew: {
      id: number
      name: string
      job: string
      department: string
    }[]
  }
  videos: {
    results: {
      id: string
      key: string
      name: string
      site: string
      type: string
    }[]
  }
}

export interface MovieList {
  page: number
  results: Movie[]
  total_pages: number
  total_results: number
}

export interface MovieReview {
  id: string
  author: string
  content: string
  created_at: string
  url: string
}

export interface MovieReviewList {
  id: number
  page: number
  results: MovieReview[]
  total_pages: number
  total_results: number
}
