import React from 'react'
import { screen } from '@testing-library/react'
import WatchlistButton from '@/components/WatchlistButton'
import { renderWithWatchlistProvider } from '../utils/testUtils'
import { mockMovie } from '../utils/mockData'
import userEvent from '@testing-library/user-event'

describe('WatchlistButton', () => {
  it('should render correctly', () => {
    renderWithWatchlistProvider(<WatchlistButton movieId={mockMovie.id} />)
    expect(screen.getByAltText('add to watchlist')).toBeInTheDocument()
  })

  it('should add to watchlist when button is clicked', async () => {
    renderWithWatchlistProvider(<WatchlistButton movieId={mockMovie.id} />)
    const button = screen.getByRole('button')
    await userEvent.click(button)
    expect(screen.getByAltText('remove from watchlist')).toBeInTheDocument()
    const watchlist = JSON.parse(localStorage.getItem('watchlist') || '[]')
    const movieIds = watchlist.map((movie: any) => movie.id)
    expect(movieIds).toContain(mockMovie.id)
  })

  it('should remove movie from watchlist when button is clicked', async () => {
    renderWithWatchlistProvider(<WatchlistButton movieId={mockMovie.id} />)
    const button = screen.getByRole('button')
    await userEvent.click(button)
    await userEvent.click(button)
    expect(screen.getByAltText('add to watchlist')).toBeInTheDocument()
    const watchlist = JSON.parse(localStorage.getItem('watchlist') || '[]')
    const movieIds = watchlist.map((movie: any) => movie.id)
    expect(movieIds).not.toContain(mockMovie.id)
  })
})
