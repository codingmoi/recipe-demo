using AutoMapper;
using RecipeDemo.Domain.Entities;
using RecipeDemo.Service.Dtos;

namespace RecipeDemo.Service.Mappers
{
    public class RecipeProfile : Profile
    {
        public RecipeProfile()
        {
            CreateMap<RecipeRequestDto, RecipeEntity>()
                .ForMember(dest => dest.Ingredients, opt => opt.Ignore())
                .ForMember(dest => dest.Instructions, opt => opt.Ignore())
                .ForMember(dest => dest.Image, opt => opt.Ignore()) 
                .ReverseMap();            
            CreateMap<IngredientDto, IngredientEntity>().ReverseMap();
            CreateMap<InstructionDto, InstructionEntity>().ReverseMap();
            CreateMap<RecipeEntity, RecipeResponseDto>();
        }
    }
}
