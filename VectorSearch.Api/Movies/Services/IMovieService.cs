using VectorSearch.Api.Movies.Helpers;
using VectorSearch.Api.Movies.Models;

namespace VectorSearch.Api.Movies.Services;

public interface IMovieService
{
    Task<List<Movie>> GetMoviesAsync(string term = MovieConstants.DefaultSearchTerm, int limit = MovieConstants.DefaultSearchLimit);
}
