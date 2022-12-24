
using System.Text.Json.Serialization;
using book_ecommerce.Models;
using Microsoft.EntityFrameworkCore;
using book_ecommerce.Servies;

var builder = WebApplication.CreateBuilder(args);
// Add services to the container.
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<BookdataContext>(options => options.UseMySql(connectionString, ServerVersion.Parse("8.0.30-mysql")));
builder.Services.AddTransient<ICategoryService, CategoryService>();
builder.Services.AddTransient<IBookService, BookService>();
builder.Services.AddTransient<ISeriesService, SeriesService>();
builder.Services.AddControllers().AddJsonOptions(options =>
{
    options.JsonSerializerOptions.DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull;
});
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


var app = builder.Build();
app.UseHttpLogging();
// app.UseRouting();
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseExceptionHandler("/error");


// path to api
app.MapControllers();
app.Run();
