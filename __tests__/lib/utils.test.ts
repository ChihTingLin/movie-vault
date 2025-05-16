import { sortMovies } from '@/lib/utils'
import { mockMovies } from '../utils/mockData'

describe('sortMovies', () => {
  it('should sort movies by added_at_latest', () => {
    const sortedMovies = sortMovies(mockMovies, 'added_at_latest')
    const sortedDates = sortedMovies.map(movie => movie.added_at)
    expect(sortedDates).toEqual(['2025-04-12', '2025-01-02', '2024-01-01'])
  })
  it('should sort movies by added_at_oldest', () => {
    const sortedMovies = sortMovies(mockMovies, 'added_at_oldest')
    const sortedDates = sortedMovies.map(movie => movie.added_at)
    expect(sortedDates).toEqual(['2024-01-01', '2025-01-02', '2025-04-12'])
  })
  it('should sort movies by popularity_desc', () => {
    const sortedMovies = sortMovies(mockMovies, 'popularity_desc')
    const sortedPopularity = sortedMovies.map(movie => movie.popularity)
    expect(sortedPopularity).toEqual([2.6369, 1.597, 0.4395])
  })
  it('should sort movies by popularity_asc', () => {
    const sortedMovies = sortMovies(mockMovies, 'popularity_asc')
    const sortedPopularity = sortedMovies.map(movie => movie.popularity)
    expect(sortedPopularity).toEqual([0.4395, 1.597, 2.6369])
  })
  it('should sort movies by release_date_latest', () => {
    const sortedMovies = sortMovies(mockMovies, 'release_date_latest')
    const sortedDates = sortedMovies.map(movie => movie.release_date)
    expect(sortedDates).toEqual(['2019-11-23', '2019-02-08', '1998-09-22'])
  })
  it('should sort movies by release_date_oldest', () => {
    const sortedMovies = sortMovies(mockMovies, 'release_date_oldest')
    const sortedDates = sortedMovies.map(movie => movie.release_date)
    expect(sortedDates).toEqual(['1998-09-22', '2019-02-08', '2019-11-23'])
  })
  it('should sort movies by vote_average_desc', () => {
    const sortedMovies = sortMovies(mockMovies, 'vote_average_desc')
    const sortedVoteAverage = sortedMovies.map(movie => movie.vote_average)
    expect(sortedVoteAverage).toEqual([7.672, 5.9, 5.43])
  })
  it('should sort movies by vote_average_asc', () => {
    const sortedMovies = sortMovies(mockMovies, 'vote_average_asc')
    const sortedVoteAverage = sortedMovies.map(movie => movie.vote_average)
    expect(sortedVoteAverage).toEqual([5.43, 5.9, 7.672])
  })
})
