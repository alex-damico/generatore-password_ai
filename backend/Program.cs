using System.Security.Cryptography;
using System.Text.Json.Serialization;
using Scalar.AspNetCore;

var builder = WebApplication.CreateBuilder(args);

// Configure listening on http://localhost:5000
var urls = Environment.GetEnvironmentVariable("ASPNETCORE_URLS") ?? "http://localhost:5000";
builder.WebHost.UseUrls(urls);

// Add OpenAPI services
builder.Services.AddOpenApi();

// Enable CORS to allow requests from the frontend
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();

app.UseCors();

// Map OpenAPI document and Scalar API reference UI
app.MapOpenApi();
app.MapScalarApiReference();

// Optional redirect from root to Scalar UI for quick browser access
app.MapGet("/", () => Results.Redirect("/scalar/v1"));

app.MapPost("/genera-password", (GeneratePasswordRequest? request) =>
{
    int length = request?.Length is > 0 ? request.Length.Value : 16;
    bool includeNumbers = request?.Number ?? true;
    bool includeSymbols = request?.Symbol ?? true;

    string password = PasswordGeneratorService.GeneratePassword(length, includeNumbers, includeSymbols);

    return Results.Ok(new GeneratePasswordResponse(password));
})
.WithName("GeneratePassword")
.WithSummary("Generate a cryptographically secure random password");

app.Run();

public record GeneratePasswordRequest(
    [property: JsonPropertyName("length")] int? Length,
    [property: JsonPropertyName("number")] bool? Number,
    [property: JsonPropertyName("symbol")] bool? Symbol
);

public record GeneratePasswordResponse(
    [property: JsonPropertyName("password")] string Password
);

public static class PasswordGeneratorService
{
    private const string LowercaseLetters = "abcdefghijklmnopqrstuvwxyz";
    private const string UppercaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    private const string Digits = "0123456789";
    private const string SpecialCharacters = "!@#$%^&*()_+-=[]{}|;:,.<>?";

    public static string GeneratePassword(int length, bool includeNumbers, bool includeSymbols)
    {
        if (length <= 0)
        {
            length = 16;
        }

        var pool = LowercaseLetters + UppercaseLetters;
        if (includeNumbers) pool += Digits;
        if (includeSymbols) pool += SpecialCharacters;

        char[] passwordChars = new char[length];
        int currentIndex = 0;

        // Ensure at least one character from each requested category if length allows
        var requiredSets = new List<string> { LowercaseLetters, UppercaseLetters };
        if (includeNumbers) requiredSets.Add(Digits);
        if (includeSymbols) requiredSets.Add(SpecialCharacters);

        if (length >= requiredSets.Count)
        {
            foreach (var set in requiredSets)
            {
                passwordChars[currentIndex++] = set[RandomNumberGenerator.GetInt32(set.Length)];
            }
        }

        // Fill remaining length from the combined character pool
        while (currentIndex < length)
        {
            passwordChars[currentIndex++] = pool[RandomNumberGenerator.GetInt32(pool.Length)];
        }

        // Cryptographically shuffle the generated characters
        RandomNumberGenerator.Shuffle<char>(passwordChars);

        return new string(passwordChars);
    }
}
