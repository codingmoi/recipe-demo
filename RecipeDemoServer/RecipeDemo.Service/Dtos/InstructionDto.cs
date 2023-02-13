using RecipeDemo.Domain.Common;

namespace RecipeDemo.Service.Dtos
{
    public class InstructionDto : ObjectState
    {
        public int Id { get; set; }
        public string Description { get; set; }       
    }
}
