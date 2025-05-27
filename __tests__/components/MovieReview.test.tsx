import React from 'react'
import { render, screen } from '@testing-library/react'
import MovieReview from '@/components/MovieReview'
import { mockMovieReview } from '../mocks/mockData'
import userEvent from '@testing-library/user-event'

describe('MovieReview', () => {
  it('should render correctly', () => {
    render(<MovieReview review={mockMovieReview} />)
    expect(screen.getByText(mockMovieReview.author)).toBeInTheDocument()
    expect(screen.getByRole('paragraph').textContent).toContain(
      mockMovieReview.content
    )
    const button = screen.getByRole('button')
    expect(button.textContent).toBe('展開')
  })

  it('should expand review when button is clicked', async () => {
    render(<MovieReview review={mockMovieReview} />)
    const button = screen.getByRole('button')
    await userEvent.click(button)
    expect(button.textContent).toBe('收起')
  })

  it('should collapse review when button is clicked', async () => {
    render(<MovieReview review={mockMovieReview} />)
    const button = screen.getByRole('button')
    await userEvent.click(button)
    await userEvent.click(button)
    expect(button.textContent).toBe('展開')
  })
})
