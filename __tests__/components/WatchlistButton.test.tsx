import React from 'react'
import { render, screen } from '@testing-library/react'
import WatchlistButton from '@/components/WatchlistButton'
import { mockMovie } from '../mocks/mockData'
import userEvent from '@testing-library/user-event'
import useWatchlistStore from '@/lib/store/watchlistStore'

beforeEach(() => {
  useWatchlistStore.setState({ watchlist: [] })
  localStorage.clear()
})

describe('WatchlistButton', () => {
  it('should render correctly', () => {
    render(<WatchlistButton movie={mockMovie} />)
    expect(screen.getByAltText('add to watchlist')).toBeInTheDocument()
  })

  it('should add to watchlist when button is clicked', async () => {
    render(<WatchlistButton movie={mockMovie} />)
    const button = screen.getByRole('button')
    await userEvent.click(button)
    const watchlist = useWatchlistStore.getState().watchlist
    const movieIds = watchlist.map((movie: { id: number }) => movie.id)
    expect(movieIds).toContain(mockMovie.id)
  })

  it('should remove movie from watchlist when button is clicked', async () => {
    render(<WatchlistButton movie={mockMovie} />)
    const button = screen.getByRole('button')
    await userEvent.click(button)
    await userEvent.click(button)
    const watchlist = useWatchlistStore.getState().watchlist
    const movieIds = watchlist.map((movie: { id: number }) => movie.id)
    expect(movieIds).not.toContain(mockMovie.id)
  })
})
