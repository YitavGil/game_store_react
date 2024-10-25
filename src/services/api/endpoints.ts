export const ENDPOINTS = {
    GAMES: '/games',
    GAME_DETAILS: (id: number) => `/games/${id}`,
    GAME_SCREENSHOTS: (id: number) => `/games/${id}/screenshots`,
    GENRES: '/genres',
    PLATFORMS: '/platforms',
    TAGS: '/tags',
    PUBLISHERS: '/publishers',
    DEVELOPERS: '/developers',
  } as const;