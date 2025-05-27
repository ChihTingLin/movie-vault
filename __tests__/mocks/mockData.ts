import { Movie } from '@/types/movie'

export const mockMovie = {
  adult: false,
  backdrop_path: '/76hrjuQn3XwwsPRAHv56NuUcNIi.jpg',
  genre_ids: [16, 9648, 10751, 27],
  id: 131519,
  original_language: 'en',
  original_title: 'Scooby-Doo on Zombie Island',
  overview:
    '史酷比偵探小組重聚到月疤島探案，他們在島上碰到了海盜幽靈、貓人，還有殭屍！這座鬧鬼的島嶼到底藏有什麼黑暗祕密？',
  popularity: 2.6369,
  poster_path: '/7EdvFUGvT5Pn8rUFRKCrdUzNthf.jpg',
  release_date: '1998-09-22',
  title: '史酷比：僵屍島歷險記',
  video: false,
  vote_average: 7.672,
  vote_count: 776,
}

export const mockMovies: Movie[] = [
  {
    adult: false,
    backdrop_path: '/76hrjuQn3XwwsPRAHv56NuUcNIi.jpg',
    genre_ids: [16, 9648, 10751, 27],
    id: 13151,
    original_language: 'en',
    original_title: 'Scooby-Doo on Zombie Island',
    overview:
      '史酷比偵探小組重聚到月疤島探案，他們在島上碰到了海盜幽靈、貓人，還有殭屍！這座鬧鬼的島嶼到底藏有什麼黑暗祕密？',
    popularity: 2.6369,
    poster_path: '/7EdvFUGvT5Pn8rUFRKCrdUzNthf.jpg',
    release_date: '1998-09-22',
    title: '史酷比：僵屍島歷險記',
    video: false,
    vote_average: 7.672,
    vote_count: 776,
    added_at: '2024-01-01',
  },
  {
    adult: false,
    backdrop_path: '/wzdStAFmieoF4CgjLwj0AcoIW1r.jpg',
    genre_ids: [35],
    id: 580001,
    original_language: 'en',
    original_title: "Kevin Hart's Guide to Black History",
    overview:
      '在這部充滿娛樂效果又富含教育意義的喜劇特輯中，凱文·哈特點出黑人歷史中若干無名英雄的出色貢獻',
    popularity: 0.4395,
    poster_path: '/iQwffy1qLo1JPudjPO5TQGQX9QX.jpg',
    release_date: '2019-02-08',
    title: '凱文·哈特：黑人歷史指南',
    video: false,
    vote_average: 5.43,
    vote_count: 43,
    added_at: '2025-01-02',
  },
  {
    adult: false,
    backdrop_path: '/6xIZ4GCZ5Dhjv8tYU88ZbZ4PwxQ.jpg',
    genre_ids: [80, 18, 37, 53],
    id: 501395,
    original_language: 'en',
    original_title: 'True History of the Kelly Gang',
    overview:
      '奈德凱利是澳洲最傳奇的綠林大盜，文化地位可比台灣的廖添丁。《刺客教條》導演賈斯汀克佐改編澳洲作家彼得凱瑞的同名布克獎小說，訴說奈德如何在蠻橫官吏欺壓下走上末路，也揭開這位鐵漢內心的脆弱與柔軟。',
    popularity: 1.597,
    poster_path: '/eVyESHnWiTY1el8DEWbYMVW3K5k.jpg',
    release_date: '2019-11-23',
    title: '凱利幫的真實歷史',
    video: false,
    vote_average: 5.9,
    vote_count: 324,
    added_at: '2025-04-12',
  },
]

export const mockMovieReview = {
  author: 'The Movie Mob',
  author_details: {
    name: 'The Movie Mob',
    username: 'mooney240',
    avatar_path: '/blEC280vq31MVaDcsWBXuGOsYnB.jpg',
    rating: 7,
  },
  content:
    "**Mission: Impossible - Dead Reckoning (Part One) boasts some of cinema's most stunning stunt work, but it came at the cost of character development and a solid story.**\r\n\r\nMan…. I wish I loved this movie more than I did. Don't get me wrong, it's a solid action movie with jaw-dropping stunts (some of the best in the series), but as a Mission: Impossible movie, it felt like a small step backward for the franchise. Fallout had mind-blowing action sequences and stunt work, along with developing Ethan's relationship with Ilsa, providing closure with Julia, showing the lengths Ethan would go to protect those closest to him, and battling an imposing villain. Dead Reckoning: Part One stretches the movie across two films only to seemingly showcase action spectacle after action spectacle while sacrificing character development. Characters I have grown to love over a decade of films felt sidelined, ignored, or wasted. Hayley Atwell's new character chewed up most of the screen time, and while she was fantastic, I wanted to see more of the original team. The new villain had an inconsistent ability that confused more than intimidated. There were some important emotional moments that I just didn't feel the weight of when I definitely should have. Part Two might tie everything together and make me enjoy Part One more in retrospect, but unfortunately, I left wanting more from this one.",
  created_at: '2023-07-12T05:24:21.317Z',
  id: '64ae3905d6590b00c7acf53f',
  updated_at: '2023-07-12T05:24:21.415Z',
  url: 'https://www.themoviedb.org/review/64ae3905d6590b00c7acf53f',
}
