import { act, fireEvent, render, screen } from '@testing-library/react'
import MovieGrid from '../../components/MovieGrid'
import { mockMovies } from '../mocks/mockData'

const mockOnLoadMore = jest.fn().mockResolvedValue({
  results: mockMovies.map(m => ({ ...m, id: m.id + 1 })),
  total_pages: 2,
})

beforeAll(() => {
  class MockIntersectionObserver {
    cb: (entries: IntersectionObserverEntry[]) => void
    constructor(cb: (entries: IntersectionObserverEntry[]) => void) {
      this.cb = cb
    }
    observe = () => {
      // 直接觸發 callback，模擬進入 viewport
      this.cb([{ isIntersecting: true } as IntersectionObserverEntry])
    }
    disconnect = () => {}
  }
  // @ts-expect-error type error
  global.IntersectionObserver = MockIntersectionObserver
})

describe('MovieGrid', () => {
  it('renders initial movies correctly', async () => {
    await act(async () => {
      render(
        <MovieGrid
          initialMovies={mockMovies}
          totalPages={1}
          onLoadMore={mockOnLoadMore}
        />
      )
    })
    const grid = screen.getByTestId('movie-grid')
    expect(grid.children.length).toBe(mockMovies.length)
  })

  it('loads more movies when scrolled to the bottom', async () => {
    await act(async () => {
      render(
        <MovieGrid
          initialMovies={mockMovies}
          totalPages={2}
          onLoadMore={mockOnLoadMore}
        />
      )
    })
    const trigger = screen.getByTestId('movie-loading-trigger')
    const grid = screen.getByTestId('movie-grid')
    fireEvent.scroll(trigger, { target: { scrollY: 100 } })
    expect(mockOnLoadMore).toHaveBeenCalled()
    expect(grid.children.length).toBe(mockMovies.length * 2)
  })

  it('renders loading state when loading more movies', async () => {
    await act(async () => {
      render(
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
