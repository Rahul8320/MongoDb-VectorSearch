using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace VectorSearch.Api.Movies.Models;

[BsonIgnoreExtraElements]
public class Movie
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string Id { get; set; } = string.Empty;

    [BsonElement("plot")]
    public string Plot { get; set; } = string.Empty;

    [BsonElement("genres")]
    public List<string> Genres { get; set; } = [];

    [BsonElement("runtime")]
    public int Runtime { get; set; }

    [BsonElement("cast")]
    public List<string> Cast { get; set; } = [];

    [BsonElement("num_mflix_comments")]
    public int NumMflixComments { get; set; }

    [BsonElement("poster")]
    public string Poster { get; set; } = string.Empty;

    [BsonElement("title")] 
    public string Title { get; set; } = string.Empty;

    [BsonElement("fullplot")]
    public string Fullplot { get; set; } = string.Empty;

    [BsonElement("languages")]
    public List<string> Languages { get; set; } = [];

    [BsonElement("released")]
    public DateTime Released { get; set; }

    [BsonElement("directors")]
    public List<string> Directors { get; set; } = [];

    [BsonElement("writers")]
    public List<string> Writers { get; set; } = [];

    [BsonElement("awards")]
    public Awards Awards { get; set; } = default!;

    [BsonElement("lastupdated")]
    public DateTime LastUpdated { get; set; }

    [BsonElement("year")]
    public int Year { get; set; }

    [BsonElement("imdb")]
    public IMDB Imdb { get; set; } = default!;

    [BsonElement("countries")]
    public List<string> Countries { get; set; } = [];

    [BsonElement("type")]
    public string Type { get; set; } = string.Empty;

    [BsonElement("tomatoes")]
    public Tomatoes Tomatoes { get; set; } = default!;

    [BsonElement("metacritic")]
    public int? Metacritic { get; set; }

    [BsonElement("awesome")]
    public bool? Awesome { get; set; }
}

public class Awards
{
    [BsonElement("wins")]
    public int Wins { get; set; }

    [BsonElement("nominations")]
    public int Nominations { get; set; }

    [BsonElement("text")]
    public string Text { get; set; } = string.Empty;
}

public class IMDB
{
    [BsonElement("rating")]
    public decimal Rating { get; set; }

    [BsonElement("votes")]
    public int Votes { get; set; }

    [BsonElement("id")]
    public int Id { get; set; }
}

public class Viwer
{
    [BsonElement("rating")]
    public decimal Rating { get; set; }

    [BsonElement("numReviews")]
    public int NumReviews { get; set; }
}

public class Tomatoes
{
    [BsonElement("Viwer")]
    public Viwer Viwer { get; set; } = default!;

    [BsonElement("production")]
    public string Production { get; set; } = string.Empty;

    [BsonElement("lastUpdated")]
    public DateTime LastUpdated { get; set; }
}