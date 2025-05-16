export interface Genre {
  id: number
  name: string
}

export const movieGenres: Genre[] = [
  { id: 28, name: '動作' },
  { id: 12, name: '冒險' },
  { id: 16, name: '動畫' },
  { id: 35, name: '喜劇' },
  { id: 80, name: '犯罪' },
  { id: 99, name: '紀錄片' },
  { id: 18, name: '劇情' },
  { id: 10751, name: '家庭' },
  { id: 14, name: '奇幻' },
  { id: 36, name: '歷史' },
  { id: 27, name: '恐怖' },
  { id: 10402, name: '音樂' },
  { id: 9648, name: '懸疑' },
  { id: 10749, name: '愛情' },
  { id: 878, name: '科幻' },
  { id: 10770, name: '電視電影' },
  { id: 53, name: '驚悚' },
  { id: 10752, name: '戰爭' },
  { id: 37, name: '西部' },
] as const

/**
 * 根據類型 ID 取得類型名稱
 * @param id 類型 ID
 * @returns 類型名稱，如果找不到則返回 undefined
 */
export const getGenreName = (id: number): string | undefined =>
  movieGenres.find(genre => genre.id === id)?.name

/**
 * 根據類型名稱取得類型 ID
 * @param name 類型名稱
 * @returns 類型 ID，如果找不到則返回 undefined
 */
export const getGenreId = (name: string): number | undefined =>
  movieGenres.find(genre => genre.name === name)?.id

/**
 * 根據多個類型 ID 取得類型名稱陣列
 * @param ids 類型 ID 陣列
 * @returns 類型名稱陣列
 */
export const getGenreNames = (ids: number[]): string[] =>
  ids.map(id => getGenreName(id)).filter((name): name is string => !!name)

/**
 * 根據多個類型名稱取得類型 ID 陣列
 * @param names 類型名稱陣列
 * @returns 類型 ID 陣列
 */
export const getGenreIds = (names: string[]): number[] =>
  names.map(name => getGenreId(name)).filter((id): id is number => !!id)
