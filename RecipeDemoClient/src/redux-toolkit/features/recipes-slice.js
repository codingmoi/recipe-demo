import { createSlice } from "@reduxjs/toolkit";
import { getRecipes } from "../thunks/recipe-thunks";

const recipesSlice = createSlice({
  name: "recipes",
  initialState: {
    recipes: [
      {
        id: 0,
        name: "recipe",
        description: "",
        image: "",
      },
    ],
    status: "idle",
  },
  reducers: {
    initRecipes: (state, action) =>{
      state.recipes = action.payload;
    },
    addRecipe: (state, action) => {
      const newRecipe = action.payload;
      state.recipes.push(newRecipe);
    },
    updateRecipe: (state, action) => {
      const { index, recipe } = action.payload;
      state.recipes[index] = { ...state.recipes[index], ...recipe };
    },
    deleteRecipe: (state, action) => {
      //   const index = action.payload;
      //   state.recipes.splice(index, 1);
    },
  },
  extraReducers: {
    [getRecipes.pending]: (state, action) => {
      state.status = "loading";
    },
    [getRecipes.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.recipes = action.payload;
    },
    [getRecipes.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

export const { initRecipes, addRecipe, updateRecipe, deleteRecipe } = recipesSlice.actions;
export const selectRecipes = (state) => state.recipes;
export default recipesSlice.reducer;
