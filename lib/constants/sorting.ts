export const options = [
  {
    label: '預設',
    value: '',
  },
  {
    label: '上映時間 (由新到舊)',
    value: 'release_date_latest',
  },
  {
    label: '上映時間 (由舊到新)',
    value: 'release_date_oldest',
  },
  {
    label: '熱門度 (由高到低)',
    value: 'popularity_desc',
  },
  {
    label: '熱門度 (由低到高)',
    value: 'popularity_asc',
  },
  {
    label: '評分 (由高到低)',
    value: 'vote_average_desc',
  },
  {
    label: '評分 (由低到高)',
    value: 'vote_average_asc',
  },
]

export const watchlistSortingOptions = [
  {
    label: '收藏時間 (由新到舊)',
    value: 'added_at_latest',
  },
  {
    label: '收藏時間 (由舊到新)',
    value: 'added_at_oldest',
  },
  ...options,
]
