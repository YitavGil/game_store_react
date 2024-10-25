export interface Game {
    id: number;
    name: string;
    background_image: string;
    rating: number;
    released: string;
    genres: Genre[];
    platforms: Platform[];
    price: number; // We'll add this since RAWG doesn't provide prices
    description_raw?: string;
    metacritic?: number;
    developers?: Developer[];
    publishers?: Publisher[];
    esrb_rating?: ESRBRating;
     hasMore: boolean;
  }
  
  export interface Genre {
    id: number;
    name: string;
    slug: string;  
  }
  
  export interface Platform {
    platform: {
      id: number;
      name: string;
      slug: string;
    }
  }
  
  export interface Developer {
    id: number;
    name: string;
  }
  
  export interface Publisher {
    id: number;
    name: string;
  }
  
  export interface ESRBRating {
    id: number;
    name: string;
  }
  