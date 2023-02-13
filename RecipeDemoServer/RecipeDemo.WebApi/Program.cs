using Microsoft.EntityFrameworkCore;
using RecipeDemo.Infrastructure.Persistence.Contexts;
using RecipeDemo.Service.Implementations;
using RecipeDemo.Service.Interfaces;
using RecipeDemo.Service.Mappers;

namespace RecipeDemo.WebApi
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();
            builder.Services.AddCors(p => p.AddPolicy("recipe-policy", builder =>
            {
                builder.WithOrigins("*").AllowAnyMethod().AllowAnyHeader();
            }));
            builder.Services.AddDbContext<RecipeDemoContext>(options =>
                options.UseSqlServer(builder.Configuration.GetConnectionString("RecipeDemoContext")));
            builder.Services.AddAutoMapper(typeof(RecipeProfile));
            builder.Services.AddTransient<IRecipeService, RecipeService>();

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseCors("recipe-policy");
            app.UseAuthorization();

            app.MapControllers();

            app.Run();
        }
    }
}