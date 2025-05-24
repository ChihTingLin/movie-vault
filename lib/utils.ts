import { Movie } from '@/types/movie'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// 生成 SVG 模糊效果
export const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#333" offset="20%" />
      <stop stop-color="#222" offset="50%" />
      <stop stop-color="#333" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#333" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`

// 轉換為 base64
export const toBase64 = (str: string) =>
  typeof window === 'undefined'
    ? Buffer.from(str).toString('base64')
    : window.btoa(str)

export const sortMovies = (
  movies: Movie[],
  sorting: string,
  originalMovieIds: number[]
): Movie[] => {
  switch (sorting) {
    case '':
      return originalMovieIds
        .map(id => movies.find(m => m.id === id))
        .filter(Boolean) as Movie[]
    case 'added_at_latest':
      return movies.sort(
        (a, b) =>
          new Date(b.added_at || '').getTime() -
          new Date(a.added_at || '').getTime()
      )
    case 'added_at_oldest':
      return movies.sort(
        (a, b) =>
          new Date(a.added_at || '').getTime() -
          new Date(b.added_at || '').getTime()
      )
    case 'popularity_desc':
      return movies.sort((a, b) => b.popularity - a.popularity)
    case 'popularity_asc':
      return movies.sort((a, b) => a.popularity - b.popularity)
    case 'release_date_latest':
      return movies.sort(
        (a, b) =>
          new Date(b.release_date).getTime() -
          new Date(a.release_date).getTime()
      )
    case 'release_date_oldest':
      return movies.sort(
        (a, b) =>
          new Date(a.release_date).getTime() -
          new Date(b.release_date).getTime()
      )
    case 'vote_average_desc':
      return movies.sort((a, b) => b.vote_average - a.vote_average)
    case 'vote_average_asc':
      return movies.sort((a, b) => a.vote_average - b.vote_average)
    default:
      return movies
  }
}

export const removeDuplicateMovies = (movies: Movie[]) => {
  return movies.filter(
    (movie, index, self) => index === self.findIndex(t => t.id === movie.id)
  )
}
