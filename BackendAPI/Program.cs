using BackendAPI.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Enable CORS (Allowing requests from frontend)
builder.Services.AddCors(options => 
{
    options.AddPolicy("AllowFrontend",
        policy =>
        {
            policy.WithOrigins("http://localhost:3000")
                .AllowAnyHeader()
                .AllowAnyMethod();
        });
});

builder.Services.AddScoped<ITaxService, TaxService>();


builder.Services.AddControllers();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// USe CORS middleware
app.UseCors("AllowFrontend");
app.UseAuthorization();

app.MapControllers();

app.Run();


