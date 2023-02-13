using Microsoft.AspNetCore.Mvc;
using RecipeDemo.Service.Dtos;
using RecipeDemo.Service.Interfaces;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace RecipeDemo.WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RecipeController : ControllerBase
    {
        private readonly IRecipeService _recipeService;

        public RecipeController(IRecipeService recipeService)
        {
            _recipeService = recipeService;
        }

        // GET: api/<RecipeController>
        [HttpGet]
        public async Task<ActionResult> GetRecipes()
        {
            return Ok(await _recipeService.GetRecipes());
        }

        // GET api/<RecipeController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult> GetRecipe(int id)
        {
            return Ok(await _recipeService.GetRecipeById(id));
        }

        [HttpGet("Search")]
        public async Task<ActionResult> SearchRecipe([FromQuery] string? value)
        {
            return Ok(await _recipeService.SearchRecipe(value));
        }

        // POST api/<RecipeController>
        [HttpPost]
        public async Task<ActionResult> CreateRecipe([FromForm] RecipeRequestDto request)
        {
            await _recipeService.CreateRecipe(request);
            return CreatedAtAction(nameof(GetRecipe), new { id = request.Id }, request);
        }

        // PUT api/<RecipeController>/5
        [HttpPut]
        public async Task<ActionResult> UpdateRecipe([FromForm] RecipeRequestDto request)
        {
            await _recipeService.UpdateRecipe(request);
            return NoContent();
        }

        // DELETE api/<RecipeController>/5
        [HttpDelete("{id}")]
        public async Task DeleteRecipe(int id)
        {
            await _recipeService.DeleteRecipe(id);
        }
    }
}
