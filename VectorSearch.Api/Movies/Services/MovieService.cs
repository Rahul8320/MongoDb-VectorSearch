using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using VectorSearch.Api.Movies.Helpers;
using VectorSearch.Api.Movies.Models;

namespace VectorSearch.Api.Movies.Services;

public class MovieService : IMovieService
{
	private readonly IMongoCollection<Movie> _moviesCollection;
	private readonly ILogger<MovieService> _logger;
	private readonly IMemoryCache _cache;
	private readonly TimeSpan _cacheDuration = TimeSpan.FromSeconds(MovieConstants.CachedDurationInSeconds);

    public MovieService(IMongoClient mongoClient, 
	    IOptions<MongoDbConfig> mongoConfig, 
	    ILogger<MovieService> logger,
	    IMemoryCache cache)
    {
		var mongoDbConfig = mongoConfig.Value;
		var database = mongoClient.GetDatabase(mongoDbConfig.DatabaseName);
		_moviesCollection = database.GetCollection<Movie>(mongoDbConfig.CollectionName);
		_logger = logger;
		_cache = cache;
    }

    public async Task<List<Movie>> GetMoviesAsync(string? term = MovieConstants.DefaultSearchTerm, int limit = MovieConstants.DefaultSearchLimit)
    {
		try
		{
			var cacheKey = $"{term}_{limit}";
			_logger.LogInformation("Searching for movies in cached data. Key: {key}", cacheKey);
			
			if (_cache.TryGetValue(cacheKey, out List<Movie>? cachedResult))
			{
				_logger.LogInformation("Cache hit. Key: {key}, Movies count: {count}", cacheKey, cachedResult?.Count);
				return cachedResult ?? [];
			}
			
			_logger.LogWarning("No data found in cached. Key: {key}", cacheKey);
			_logger.LogInformation("Start searching movies... SearchTerm: {term}, limit: {limit}", term, limit);
			var filter = Builders<Movie>.Filter.Empty;

			if (string.IsNullOrEmpty(term) is false)
			{
                filter = Builders<Movie>.Filter.Where(m => m.Title.ToLower().Contains(term.ToLower()));
                _logger.LogInformation("Search filter added. SearchTerm: {term}", term.ToLower());
			}

			var movieList = await _moviesCollection.Find(filter).Limit(limit).ToListAsync();
			_logger.LogInformation("Searched completed. Found movies count: {count}", movieList.Count);

			var cacheEntryOptions = new MemoryCacheEntryOptions()
				.SetAbsoluteExpiration(_cacheDuration);
            
			_cache.Set(cacheKey, movieList, cacheEntryOptions);
			_logger.LogInformation("Movies data cached. Key: {key}, Movies Count: {count}", cacheKey, movieList.Count);
			
			return movieList;
		}
		catch (Exception ex)
		{
			_logger.LogError(ex, "Failed to get Movies. Error: {err}", ex.Message);
			return [];
		}
    }
}
