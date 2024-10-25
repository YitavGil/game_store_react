export interface Game {
  id: number;
  name: string;
  background_image: string;
  rating: number;
  released: string;
  genres: Genre[];
  platforms: Platform[];
  price: number; 
  description_raw?: string;
  metacritic?: number;
  developers?: Developer[];
  publishers?: Publisher[];
  esrb_rating?: ESRBRating;
  hasMore: boolean;
  screenshots?: Screenshot[];
  description?: string;
  website?: string;
  reddit_url?: string;
  metacritic_url?: string;
  ratings_count?: number;
  stores?: Store[];
  tags?: Tag[];
  similar_games?: Game[]; 
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

  export interface Screenshot {
    id: number;
    image: string;
    width: number;
    height: number;
    is_deleted: boolean;
  }
  
  export interface Store {
    id: number;
    store: {
      id: number;
      name: string;
      slug: string;
    }
  }
  
  export interface Tag {
    id: number;
    name: string;
    slug: string;
  }
  