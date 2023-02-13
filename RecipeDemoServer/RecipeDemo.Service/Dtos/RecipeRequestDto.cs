using Microsoft.AspNetCore.Http;

namespace RecipeDemo.Service.Dtos
{
    public class RecipeRequestDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public IFormFile? Image { get; set; }
        public string? FileName { get; set; }
        public string Ingredients { get; set; }
        public string Instructions { get; set; }        
    }
}
