namespace RecipeDemo.Domain.Entities
{
    public class RecipeEntity
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public byte[]? Image { get; set; }
        public string FileName { get; set; }
        public ICollection<IngredientEntity> Ingredients { get; set; }
        public ICollection<InstructionEntity> Instructions { get; set; }
    }
}
