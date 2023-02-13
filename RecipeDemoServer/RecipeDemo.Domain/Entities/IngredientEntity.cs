using RecipeDemo.Domain.Common;

namespace RecipeDemo.Domain.Entities
{
    public class IngredientEntity : ObjectState
    {
        public int Id { get; set; }
        public string Description { get; set; }
        public int RecipeId { get; set; }
        public RecipeEntity Recipe { get; set; }        
    }
}
