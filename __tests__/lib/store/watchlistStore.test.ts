import { mockMovie, mockMovies } from '@/__tests__/mocks/mockData'
import useWatchlistStore from '@/lib/store/watchlistStore'

beforeEach(() => {
  useWatchlistStore.setState({ watchlist: [] })
  localStorage.clear()
})

describe('Watch list store', () => {
  it('should add movie into watchlist', () => {
    useWatchlistStore.getState().addToWatchlist(mockMovie)
    const ids = useWatchlistStore.getState().watchlist.map(m => m.id)
    expect(ids).toContain(mockMovie.id)
  })
  it('should remove movie from watchlist', () => {
    mockMovies.forEach(m => {
      useWatchlistStore.getState().addToWatchlist(m)
    })
    useWatchlistStore.getState().removeFromWatchlist(mockMovies[0].id)
    const ids = useWatchlistStore.getState().watchlist.map(m => m.id)
    expect(ids).not.toContain(mockMovies[0].id)
  })
  it('should get movie details', async () => {
    useWatchlistStore.getState().addToWatchlist(mockMovie)
    await useWatchlistStore.getState().getWatchlistDetails()
    const map = useWatchlistStore.getState().detailsMap
    expect(Object.keys(map)).toContain(mockMovie.id.toString())
  })
})
