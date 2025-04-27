using MongoDB.Driver;
using VectorSearch.Api.Movies.Helpers;
using VectorSearch.Api.Movies.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddMemoryCache();

builder.Services.Configure<MongoDbConfig>(builder.Configuration.GetSection("MongoDbConfig"));
var mongoDbConnection = builder.Configuration.GetConnectionString("MongoDB");
builder.Services.AddSingleton<IMongoClient>(_ => new MongoClient(mongoDbConnection));

builder.Services.AddScoped<IMovieService, MovieService>();

builder.Services.AddControllers();

var app = builder.Build();

app.UseHttpsRedirection();

app.UseCors(policy => policy.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod());

app.MapControllers();

app.Run();
