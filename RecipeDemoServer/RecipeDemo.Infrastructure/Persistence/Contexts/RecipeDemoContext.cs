using Microsoft.EntityFrameworkCore;
using RecipeDemo.Domain.Entities;

namespace RecipeDemo.Infrastructure.Persistence.Contexts
{
    public class RecipeDemoContext : DbContext
    {
        public DbSet<RecipeEntity> Recipes { get; set; }
        public DbSet<IngredientEntity> Ingredients { get; set; }
        public DbSet<InstructionEntity> Instructions { get; set; }

        public RecipeDemoContext(DbContextOptions<RecipeDemoContext> options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<RecipeEntity>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Name);
                entity.Property(e => e.Description);
                entity.Property(e => e.Image);
                entity.Property(e => e.FileName);
            });

            modelBuilder.Entity<IngredientEntity>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Description);
                entity.Ignore(e => e.State);
                entity.HasOne(i => i.Recipe)
                    .WithMany(r => r.Ingredients)
                    .HasForeignKey(i => i.RecipeId);
            });

            modelBuilder.Entity<InstructionEntity>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Description);
                entity.Ignore(e => e.State);
                entity.HasOne(i => i.Recipe)
                    .WithMany(r => r.Instructions)
                    .HasForeignKey(i => i.RecipeId);
            });
        }
    }
}
