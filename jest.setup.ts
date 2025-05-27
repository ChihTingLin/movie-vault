import '@testing-library/jest-dom'
import 'cross-fetch/polyfill'
import { mockMovie } from './__tests__/mocks/mockData'

// 模擬 window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
})

const localStorageMock = (function () {
  let store: { [key: string]: string } = {
    watchlist: JSON.stringify([
      { id: mockMovie.id, added_at: new Date().toISOString() },
    ]),
  }
  return {
    getItem: jest.fn().mockImplementation(key => store[key] || null),
    setItem: jest.fn().mockImplementation((key, value) => {
      store[key] = value.toString()
    }),
    removeItem: jest.fn().mockImplementation(key => {
      delete store[key]
    }),
    clear: jest.fn().mockImplementation(() => {
      store = {}
    }),
  }
})()

Object.defineProperty(window, 'localStorage', { value: localStorageMock })
jest.mock('@/lib/tmdb', () => ({
  getMovieDetails: jest.fn().mockResolvedValue(mockMovie),
  getMovieReviews: jest.fn().mockResolvedValue([]),
}))

beforeEach(() => {
  localStorageMock.clear()
})
