using Microsoft.AspNetCore.Mvc;
using VectorSearch.Api.Movies.Services;

namespace VectorSearch.Api.Movies.Controllers;

[Route("api/[controller]")]
[ApiController]
public class MoviesController(IMovieService movieService, ILogger<MoviesController> logger) : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> GetMovies([FromQuery] string? searchTerm, [FromQuery] int limit)
    {
        logger.LogInformation("GetMovies called. SearchTerm: {term}, Limit: {limit}", searchTerm, limit);
        var movies = await movieService.GetMoviesAsync(searchTerm, limit);

        return Ok(movies);
    }
}
