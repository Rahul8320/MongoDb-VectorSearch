export interface Movie {
    id: string;
    title: string;
    plot: string;
    fullplot: string;
    poster: string;
    year: number;
    runtime: number;
    genres: string[];
    rated: string;
    cast: string[];
    directors: string[];
    languages: string[];
    countries: string[];
    released: string;
    imdb: {
        imdbId: number;
        votes: number;
        rating: number;
    };
    tomatoes?: {
        viewer?: {
            rating: number;
            numReviews: number;
            meter: number;
        };
        critic?: {
            rating: number;
            numReviews: number;
            meter: number;
        };
        consensus?: string;
    };
    awards?: {
        wins: number;
        nominations: number;
        text: string;
    };
    metacritic?: number;
}