import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SearchBar from '../../components/SearchBar'
import { renderWithWatchlistProvider } from '../utils/testUtils'
import React from 'react'

const pushMock = jest.fn()
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: pushMock,
  }),
}))

describe('SearchBar', () => {
  it('renders correctly', () => {
    renderWithWatchlistProvider(<SearchBar />)
    expect(screen.getByRole('searchbox')).toBeInTheDocument()
  })

  it('updates search input value when typing', async () => {
    renderWithWatchlistProvider(<SearchBar />)
    const input = screen.getByRole('searchbox')
    await userEvent.type(input, 'test')
    expect(input).toHaveValue('test')
  })

  it('calls onSearch with correct value when form is submitted', async () => {
    renderWithWatchlistProvider(<SearchBar />)
    const input = screen.getByRole('searchbox')
    await userEvent.type(input, 'test')
    await userEvent.click(screen.getByRole('button', { name: '搜尋' }))
    expect(pushMock).toHaveBeenCalledWith('/search?q=test')
  })
})
