import { z } from 'zod'

export const MovieSchema = z.object({
  id: z.number(),
  adult: z.boolean(),
  backdrop_path: z.string().nullable(),
  genre_ids: z.array(z.number()).optional(),
  original_language: z.string(),
  original_title: z.string(),
  overview: z.string(),
  popularity: z.number(),
  poster_path: z.string().nullable(),
  release_date: z.string(),
  title: z.string(),
  video: z.boolean(),
  vote_average: z.number(),
  vote_count: z.number(),
  added_at: z.string().optional(),
})

export const MovieListSchema = z.object({
  page: z.number(),
  results: z.array(MovieSchema),
  total_pages: z.number(),
  total_results: z.number(),
})

export const MovieDetailSchema = z.object({
  id: z.number(),
  adult: z.boolean(),
  backdrop_path: z.string().nullable(),
  belongs_to_collection: z.string().nullable(),
  budget: z.number(),
  genres: z.array(z.object({ id: z.number(), name: z.string() })),
  homepage: z.string().nullable(),
  imdb_id: z.string(),
  original_language: z.string(),
  original_title: z.string(),
  overview: z.string(),
  popularity: z.number(),
  poster_path: z.string().nullable(),
  production_companies: z.array(
    z.object({
      id: z.number(),
      logo_path: z.string().nullable(),
      name: z.string(),
      origin_country: z.string(),
    })
  ),
  production_countries: z.array(
    z.object({ iso_3166_1: z.string(), name: z.string() })
  ),
  release_date: z.string(),
  revenue: z.number(),
  runtime: z.number(),
  spoken_languages: z.array(
    z.object({
      english_name: z.string(),
      iso_639_1: z.string(),
      name: z.string(),
    })
  ),
  status: z.string(),
  tagline: z.string().nullable(),
  title: z.string(),
  video: z.boolean(),
  vote_average: z.number(),
  vote_count: z.number(),
  credits: z.object({
    cast: z.array(
      z.object({
        id: z.number(),
        name: z.string(),
        character: z.string(),
        profile_path: z.string().nullable(),
      })
    ),
    crew: z.array(
      z.object({
        id: z.number(),
        name: z.string(),
        job: z.string(),
        department: z.string(),
      })
    ),
  }),
  videos: z.object({
    results: z.array(
      z.object({
        id: z.string(),
        key: z.string(),
        name: z.string(),
        site: z.string(),
        type: z.string(),
      })
    ),
  }),
})

export const MovieReviewSchema = z.object({
  id: z.string(),
  author: z.string(),
  content: z.string(),
  created_at: z.string(),
  url: z.string(),
})

export const MovieReviewListSchema = z.object({
  page: z.number(),
  results: z.array(MovieReviewSchema),
  total_pages: z.number(),
  total_results: z.number(),
})

export type Movie = z.infer<typeof MovieSchema>
export type MovieList = z.infer<typeof MovieListSchema>
export type MovieDetail = z.infer<typeof MovieDetailSchema>
export type MovieReview = z.infer<typeof MovieReviewSchema>
export type MovieReviewList = z.infer<typeof MovieReviewListSchema>
