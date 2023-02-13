namespace RecipeDemo.Service.Dtos
{
    public class RecipeResponseDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string FileName { get; set; }
        public IEnumerable<IngredientDto> Ingredients { get; set; }
        public IEnumerable<InstructionDto> Instructions { get; set; }
    }
}
