using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using RecipeDemo.Domain.Entities;
using RecipeDemo.Infrastructure.Persistence.Contexts;
using RecipeDemo.Service.Dtos;
using RecipeDemo.Service.Interfaces;

namespace RecipeDemo.Service.Implementations
{
    public class RecipeService : IRecipeService
    {
        private readonly IMapper _mapper;
        private readonly RecipeDemoContext _context;
        private readonly IConfiguration _configuration;

        public RecipeService(IMapper mapper, RecipeDemoContext context, IConfiguration configuration)
        {
            _mapper = mapper;
            _context = context;
            _configuration = configuration;
        }

        public async Task<IEnumerable<RecipeResponseDto>> GetRecipes()
        {
            try
            {
                var entities = _context.Recipes.ProjectTo<RecipeResponseDto>(_mapper.ConfigurationProvider);
                return await entities.ToListAsync();                
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<RecipeResponseDto> GetRecipeById(int id)
        {
            try
            {
                var entity = await _context.Recipes
                    .Include(recipe => recipe.Ingredients)
                    .Include(recipe => recipe.Instructions)
                    .FirstAsync(recipe => recipe.Id == id);

                if (entity == null)
                {
                    return new RecipeResponseDto();
                }

                if (!string.IsNullOrEmpty(entity.FileName))  
                {
                    var publicPath = _configuration.GetValue<string>("ImageDownloadPath");
                    var downloadPath = Path.Combine(publicPath, entity.FileName);

                    if (!File.Exists(downloadPath))
                    {
                        var imageStream = new MemoryStream(entity.Image);
                        using (var fileStream = new FileStream(downloadPath, FileMode.Create, FileAccess.Write))
                        {
                            await imageStream.CopyToAsync(fileStream);
                        }
                    }
                }                           

                return _mapper.Map<RecipeResponseDto>(entity);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task CreateRecipe(RecipeRequestDto recipeRequestDto)
        {
            try
            {                            
                var entity = _mapper.Map<RecipeEntity>(recipeRequestDto);

                SetRecipeDetails(recipeRequestDto, entity);

                if (recipeRequestDto.Image != null)
                {
                    SetFileData(recipeRequestDto, entity);
                } else
                {
                    entity.FileName = string.Empty;
                }
                _context.Recipes.Add(entity);
                await _context.SaveChangesAsync();
            }
            catch (Exception)
            {
                throw;
            }            
        }

        public async Task UpdateRecipe(RecipeRequestDto recipeRequestDto)
        {
            try
            {
                var entity = _mapper.Map<RecipeEntity>(recipeRequestDto);

                SetRecipeDetails(recipeRequestDto, entity);

                _context.Recipes.Update(entity);

                if (recipeRequestDto.Image != null)
                {
                    SetFileData(recipeRequestDto, entity);
                } else
                {
                    _context.Entry(entity).Property(e => e.Image).IsModified = false;
                    _context.Entry(entity).Property(e => e.FileName).IsModified = false;
                }

                foreach (var entry in _context.ChangeTracker.Entries())
                {
                    var entityName = entry.Entity.GetType().Name;
                    if (entityName == "IngredientEntity")
                    {
                        if (entry.IsKeySet && (entry.Entity as IngredientEntity).State == EntityState.Deleted)
                        {
                            entry.State = EntityState.Deleted;
                        }                            
                    } else if (entityName == "InstructionEntity")
                    {
                        if (entry.IsKeySet && (entry.Entity as InstructionEntity).State == EntityState.Deleted)
                        {
                            entry.State = EntityState.Deleted;
                        }
                    }
                }

                await _context.SaveChangesAsync();
            }
            catch (Exception)
            {
                throw;
            }
        }

        private static void SetFileData(RecipeRequestDto dto, RecipeEntity entity)
        {
            using (var stream = new MemoryStream())
            {
                dto.Image.CopyTo(stream);
                entity.Image = stream.ToArray();
            }

            entity.FileName = dto.Image.FileName;
        }

        private static void SetRecipeDetails(RecipeRequestDto dto, RecipeEntity entity)
        {
            entity.Ingredients = JsonConvert.DeserializeObject<ICollection<IngredientEntity>>(dto.Ingredients);
            entity.Instructions = JsonConvert.DeserializeObject<ICollection<InstructionEntity>>(dto.Instructions);
        }

        public async Task<IEnumerable<RecipeResponseDto>> SearchRecipe(string? value)
        {
            try
            {
                if (value == null)
                {
                    return await GetRecipes();
                }
   
                var query = (from recipe in _context.Recipes
                             where recipe.Name.Contains(value) ||
                                recipe.Description.Contains(value)
                                || _context.Ingredients.Any(ingredient => ingredient.RecipeId == recipe.Id && ingredient.Description.Contains(value))
                                || _context.Instructions.Any(instruction => instruction.RecipeId == recipe.Id && instruction.Description.Contains(value))
                             select recipe).ProjectTo<RecipeResponseDto>(_mapper.ConfigurationProvider);

                return await query.ToListAsync();
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task DeleteRecipe(int id)
        {
            try
            {
                var entity = _context.Recipes.FirstOrDefault(recipe => recipe.Id == id);
                if (entity != null)
                {
                    _context.Recipes.Remove(entity);
                    await _context.SaveChangesAsync();
                }                
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
