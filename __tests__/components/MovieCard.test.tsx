import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import MovieCard from '../../components/MovieCard'
import { renderWithWatchlistProvider } from '../utils/testUtils'
import { mockMovie } from '../utils/mockData'
import React from 'react'

describe('MovieCard', () => {
  it('renders movie title and poster', async () => {
    await renderWithWatchlistProvider(<MovieCard movie={mockMovie} />)

    expect(await screen.findByText(mockMovie.title)).toBeInTheDocument()
    expect(await screen.findByAltText(mockMovie.title)).toBeInTheDocument()
  })

  it('navigates to movie detail page when clicked', async () => {
    await renderWithWatchlistProvider(<MovieCard movie={mockMovie} />)

    const link = await screen.findByRole('link')
    expect(link).toHaveAttribute('href', `/movie/${mockMovie.id}`)
  })

  it('toggles watchlist when button is clicked', async () => {
    await renderWithWatchlistProvider(<MovieCard movie={mockMovie} />)

    const button = await screen.findByRole('button')
    expect(await screen.findByAltText('add to watchlist')).toBeInTheDocument()

    await userEvent.click(button)
    expect(
      await screen.findByAltText('remove from watchlist')
    ).toBeInTheDocument()

    await userEvent.click(button)
    expect(await screen.findByAltText('add to watchlist')).toBeInTheDocument()
  })
})
