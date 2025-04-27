import React, { useState } from 'react';
import { Movie } from "../types/movie.ts";

interface MovieCardProps {
    movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
    const [showDetails, setShowDetails] = useState(false);

    // Format release date
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }).format(date);
    };

    // Format runtime to hours and minutes
    const formatRuntime = (minutes: number) => {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return `${hours}h ${mins}m`;
    };

    // Determine rating color based on score
    const getRatingColor = (rating: number) => {
        if (rating >= 8) return 'text-green-400';
        if (rating >= 6) return 'text-yellow-400';
        return 'text-red-400';
    };

    // Handle image loading errors
    const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
        e.currentTarget.src = '/placeholder-movie.jpg'; // Fallback image path
        e.currentTarget.onerror = null; // Prevent infinite loop
    };

    if(!movie){
        return;
    }

    return (
        <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] h-full flex flex-col">
            <div className="relative">
                {/* Poster Image */}
                <div className="aspect-[2/3] overflow-hidden bg-gray-900">
                    {movie.poster ? (
                        <img
                            src={movie.poster}
                            alt={`${movie.title} poster`}
                            onError={handleImageError}
                            className="w-full h-full object-cover"
                            loading="lazy"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-900">
                            <span className="text-gray-500">No image available</span>
                        </div>
                    )}
                </div>

                {/* Rating Badge */}
                {movie.imdb?.rating && (
                    <div className="absolute top-2 right-2 bg-gray-900/80 backdrop-blur-sm p-1 rounded-lg">
                        <div className="flex items-center gap-1">
                            <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            <span className={`text-sm font-bold ${getRatingColor(movie.imdb.rating)}`}>
                {movie.imdb.rating.toFixed(1)}
              </span>
                        </div>
                    </div>
                )}

                {/* Rated Badge */}
                {movie.rated && (
                    <div className="absolute top-2 left-2 bg-gray-900/80 backdrop-blur-sm px-2 py-1 rounded-lg">
                        <span className="text-xs font-semibold text-gray-300">{movie.rated}</span>
                    </div>
                )}
            </div>

            {/* Movie Info */}
            <div className="p-4 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-white mb-1 line-clamp-2">{movie.title}</h3>

                <div className="flex items-center gap-2 text-sm text-gray-400 mb-3">
                    {movie.year && <span>{movie.year}</span>}
                    {movie.runtime && (
                        <>
                            <span className="text-gray-600">•</span>
                            <span>{formatRuntime(movie.runtime)}</span>
                        </>
                    )}
                </div>

                {/* Genres */}
                <div className="flex flex-wrap gap-2 mb-3">
                    {movie.genres?.slice(0, 3).map(genre => (
                        <span key={genre} className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded">
              {genre}
            </span>
                    ))}
                </div>

                {/* Plot summary - short */}
                <p className="text-gray-400 text-sm line-clamp-3 mb-4">
                    {movie.plot}
                </p>

                {/* Expand/Collapse Details Button */}
                <button
                    onClick={() => setShowDetails(!showDetails)}
                    className="mt-auto text-sm text-blue-400 hover:text-blue-300 transition-colors focus:outline-none"
                >
                    {showDetails ? 'Hide details' : 'Show details'}
                </button>

                {/* Expanded Details */}
                {showDetails && (
                    <div className="mt-4 text-sm text-gray-300 border-t border-gray-700 pt-4 space-y-3">
                        {/* Directors */}
                        {movie.directors?.length > 0 && (
                            <div>
                                <span className="text-gray-400 font-medium">Director{movie.directors.length > 1 ? 's' : ''}:</span>{' '}
                                <span>{movie.directors.join(', ')}</span>
                            </div>
                        )}

                        {/* Cast */}
                        {movie.cast?.length > 0 && (
                            <div>
                                <span className="text-gray-400 font-medium">Cast:</span>{' '}
                                <span>{movie.cast.slice(0, 4).join(', ')}{movie.cast.length > 4 ? '...' : ''}</span>
                            </div>
                        )}

                        {/* Release date */}
                        {movie.released && (
                            <div>
                                <span className="text-gray-400 font-medium">Released:</span>{' '}
                                <span>{formatDate(movie.released)}</span>
                            </div>
                        )}

                        {/* Tomatoes info if available */}
                        {movie.tomatoes?.consensus && (
                            <div>
                                <span className="text-gray-400 font-medium">Critics say:</span>{' '}
                                <span className="italic">"{movie.tomatoes.consensus}"</span>
                            </div>
                        )}

                        {/* Awards */}
                        {movie.awards?.text && (
                            <div>
                                <span className="text-gray-400 font-medium">Awards:</span>{' '}
                                <span>{movie.awards.text}</span>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MovieCard;