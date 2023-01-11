
using System.Text;
using System.Text.Json.Serialization;
using book_ecommerce.Models;
using book_ecommerce.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

public class Startup
{
    public IConfiguration Configuration { get; }
    public Startup(IConfiguration configuration)
    {
        Configuration = configuration;
    }
    public void ConfigureServices(IServiceCollection services)
    {
        var connectionString = Configuration.GetConnectionString("DefaultConnection");
        services.AddDbContext<BookdataContext>(options => options.UseMySql(connectionString, ServerVersion.Parse("8.0.30-mysql")));
        services.AddTransient<ICategoryService, CategoryService>();
        services.AddTransient<IBookService, BookService>();
        services.AddTransient<ISeriesService, SeriesService>();
        services.AddTransient<IProviderService, ProviderSerice>();
        services.AddTransient<book_ecommerce.Services.Interface.IAuthService, book_ecommerce.Services.AuthService>();
        services.AddCors(options =>
       {
           options.AddPolicy("CorsPolicy", builder =>
           {
               builder.AllowAnyOrigin()
               .WithMethods("GET", "POST", "PUT", "DELETE")
               .AllowAnyHeader();
           });
       });
        services.AddControllers().AddJsonOptions(options =>
         {
             options.JsonSerializerOptions.DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull;
         });
        services.AddEndpointsApiExplorer();
        services.AddSwaggerGen();
        services.AddAuthentication(opitions =>
        {
            opitions.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
            opitions.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            opitions.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
        }).AddJwtBearer(options =>
        {
            options.SaveToken = true;
            options.RequireHttpsMetadata = false;
            options.TokenValidationParameters = new TokenValidationParameters()
            {
                ValidateIssuer = true,
                ValidateAudience = true,
                ValidateLifetime = true,
                ValidateIssuerSigningKey = true,
                ValidAudience = Configuration["JWT:ValidAudience"],
                ValidIssuer = Configuration["JWT:ValidIssuer"],
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["JWT:Secret"]!))
            };
        });

    }
    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {

        app.UseHttpLogging();
        app.UseRouting();
        app.UseAuthentication();
        app.UseAuthorization();
        if (env.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
        }
        app.UseExceptionHandler("/error");
        app.UseEndpoints(endpoints =>
        {
            endpoints.MapControllers();
        });

    }
}