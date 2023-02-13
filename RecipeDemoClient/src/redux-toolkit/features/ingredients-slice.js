import { createSlice } from "@reduxjs/toolkit";

const ingredientsSlice = createSlice({
  name: "ingredients",
  initialState: {
    ingredientList: [{ id: 0, description: "" }]
  },
  reducers: {
    updateIngredients: (state, action) => {
      return {
        ...state,
        ingredientList: action.payload
      }
    },
  }
});

export const { updateIngredients } = ingredientsSlice.actions;
export const selectIngredients = state => state.ingredients;
export default ingredientsSlice.reducer;
