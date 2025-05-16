import { render, RenderOptions } from '@testing-library/react'
import { WatchlistProvider } from '@/contexts/WatchlistContext'

export const renderWithWatchlistProvider = (
  ui: React.ReactNode,
  options?: RenderOptions
) =>
  render(ui, {
    wrapper: ({ children }) => (
      <WatchlistProvider>{children}</WatchlistProvider>
    ),
    ...options,
  })
