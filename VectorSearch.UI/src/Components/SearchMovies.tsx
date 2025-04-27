import React, { useState, useMemo } from 'react';
import { useApi } from "../hooks/useApi.ts";
import MovieCard from './MovieCard';
import {Movie} from "../types/movie.ts";

const MovieSearch: React.FC = () => {
    const [searchText, setSearchText] = useState<string>('');

    const apiUrl = useMemo(() => {
        const trimmedSearch = searchText.trim();
        return trimmedSearch.length > 0
            ? `https://localhost:5000/api/movies?searchTerm=${encodeURIComponent(trimmedSearch)}&limit=9`
            : '';
    }, [searchText]);

    const { data: movieList = [], loading, error } = useApi<Movie[]>({
        url: apiUrl,
        dependencies: [searchText],
        shouldFetch: searchText.trim().length > 0,
    });

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(e.target.value);
    };

    return (
        <div className="min-h-screen bg-gray-900 py-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-5xl font-bold text-center text-white mb-10">
                    <span className="text-blue-400">Movie</span>Search
                </h1>

                <div className="flex justify-center mb-10">
                    <div className="relative w-full max-w-2xl">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        <input
                            type="text"
                            value={searchText}
                            onChange={handleSearchChange}
                            placeholder="Search for movies..."
                            className="bg-gray-800 text-white w-full py-3 px-10 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-700 placeholder:text-gray-500"
                            aria-label="Search movies"
                        />
                        {searchText && (
                            <button
                                onClick={() => setSearchText('')}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-300"
                            >
                                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        )}
                    </div>
                </div>

                {/* Loading state */}
                {loading && (
                    <div className="flex justify-center items-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                    </div>
                )}

                {/* Error state */}
                {!loading && error && (
                    <div className="bg-red-900/50 border border-red-700 rounded-lg p-4 text-center max-w-2xl mx-auto">
                        <p className="text-red-400 font-medium">{error}</p>
                    </div>
                )}

                {/* Empty results */}
                {!loading && !error && movieList && movieList.length === 0 && searchText.trim().length > 0 && (
                    <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-8 text-center max-w-2xl mx-auto">
                        <svg className="h-16 w-16 text-gray-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <h3 className="text-xl font-medium text-gray-300 mb-1">No movies found</h3>
                        <p className="text-gray-500">Try adjusting your search or use different keywords</p>
                    </div>
                )}

                {/* Movie Grid */}
                {!loading && !error && movieList && movieList.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {movieList.map((movie) => (
                            <MovieCard key={`${movie.id}_${movie.title}`} movie={movie} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MovieSearch;