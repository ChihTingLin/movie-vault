import { Movie } from '@/types/movie'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { getMovieDetails } from '../tmdb'
type WatchlistState = {
  watchlist: { id: number; added_at: string }[]
  detailsMap: { [key: number]: Movie }
  loading: boolean
  addToWatchlist: (movie: Movie) => void
  removeFromWatchlist: (movieId: number) => void
  isInWatchlist: (movieId: number) => boolean
  getWatchlistDetails: () => Promise<null>
}

const useWatchlistStore = create<WatchlistState>()(
  persist(
    (set, get) => ({
      watchlist: [],
      detailsMap: {},
      loading: false,
      addToWatchlist: (movie: Movie) =>
        set(state => ({
          watchlist: [
            ...state.watchlist,
            { id: movie.id, added_at: new Date().toISOString() },
          ],
        })),
      removeFromWatchlist: (movieId: number) =>
        set(state => ({
          watchlist: state.watchlist.filter(m => m.id !== movieId),
        })),
      isInWatchlist: (movieId: number): boolean => {
        const movie: { id: number; added_at: string } | undefined =
          get().watchlist.find(m => m.id === movieId)
        get().watchlist.find(m => m.id === movieId)
        return !!movie
      },
      getWatchlistDetails: async () =>
        new Promise(async resolve => {
          set(() => ({ loading: true }))
          const movieIds = get().watchlist
          const data = await Promise.all(
            movieIds.map(m => getMovieDetails(m.id))
          )
          const dataMap = data.length
            ? data.reduce((o: { [key: number]: Movie }, m: Movie) => {
                o[m.id] = m
                return o
              }, {})
            : {}
          set(() => ({ detailsMap: dataMap, loading: false }))
          resolve(null)
        }),
    }),
    {
      name: 'watchlist',
      partialize: state => ({ watchlist: state.watchlist }),
    }
  )
)

export default useWatchlistStore
