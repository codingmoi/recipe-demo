using RecipeDemo.Service.Dtos;

namespace RecipeDemo.Service.Interfaces
{
    public interface IRecipeService
    {
        Task<IEnumerable<RecipeResponseDto>> GetRecipes();
        Task<RecipeResponseDto> GetRecipeById(int id);
        Task CreateRecipe(RecipeRequestDto recipeRequestDto);
        Task UpdateRecipe(RecipeRequestDto recipeRequestDto);
        Task<IEnumerable<RecipeResponseDto>> SearchRecipe(string? value);
        Task DeleteRecipe(int id);
    }
}
