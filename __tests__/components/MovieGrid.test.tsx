import { act, screen } from '@testing-library/react'
import MovieGrid from '../../components/MovieGrid'
import { mockMovies } from '../utils/mockData'
import { renderWithWatchlistProvider } from '../utils/testUtils'

const mockOnLoadMore = jest.fn().mockResolvedValue({
  results: mockMovies,
  total_pages: 2,
})

beforeAll(() => {
  // @ts-ignore
  class MockIntersectionObserver {
    cb: any
    constructor(cb: any) {
      this.cb = cb
    }
    observe = () => {
      // 直接觸發 callback，模擬進入 viewport
      this.cb([{ isIntersecting: true }])
    }
    disconnect = () => {}
  }
  // @ts-ignore
  global.IntersectionObserver = MockIntersectionObserver
})

describe('MovieGrid', () => {
  it('renders initial movies correctly', async () => {
    await act(() => {
      renderWithWatchlistProvider(
        <MovieGrid
          initialMovies={mockMovies}
          totalPages={2}
          onLoadMore={mockOnLoadMore}
        />
      )
    })
    expect(screen.getByText(mockMovies[0].title)).toBeInTheDocument()
    expect(screen.getByText(mockMovies[1].title)).toBeInTheDocument()
  })

  it('loads more movies when scrolled to the bottom', async () => {
    await act(() => {
      renderWithWatchlistProvider(
        <MovieGrid
          initialMovies={mockMovies}
          totalPages={2}
          onLoadMore={mockOnLoadMore}
        />
      )
    })
    expect(screen.getByText(mockMovies[2].title)).toBeInTheDocument()
  })

  it('renders loading state when loading more movies', async () => {
    await act(() => {
      renderWithWatchlistProvider(
        <MovieGrid
          initialMovies={mockMovies}
          totalPages={2}
          onLoadMore={() =>
            new Promise(resolve =>
              setTimeout(() => resolve(mockOnLoadMore()), 2000)
            )
          }
        />
      )
    })
    expect(screen.getByTestId('movie-loading')).toBeInTheDocument()
  })
})
