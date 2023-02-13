import { configureStore } from "@reduxjs/toolkit";
import recipesReducer from "./features/recipes-slice";
import ingredientsReducer from "./features/ingredients-slice";

export const store = configureStore({
  reducer: {
    recipes: recipesReducer,
    ingredients: ingredientsReducer,
  },
});
