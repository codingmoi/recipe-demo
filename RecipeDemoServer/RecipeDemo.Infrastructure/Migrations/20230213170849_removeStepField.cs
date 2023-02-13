﻿using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RecipeDemo.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class removeStepField : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Step",
                table: "Instructions");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Step",
                table: "Instructions",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
