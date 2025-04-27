using Microsoft.AspNetCore.Mvc;
using VectorSearch.Api.Movies.Services;

namespace VectorSearch.Api.Movies.Controllers;

[Route("api/[controller]")]
[ApiController]
public class MoviesController(IMovieService movieService) : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> GetMovies([FromQuery] string? searchTerm, [FromQuery] int limit)
    {
        var movies = await movieService.GetMoviesAsync(searchTerm, limit);

        return Ok(movies);
    }
}
