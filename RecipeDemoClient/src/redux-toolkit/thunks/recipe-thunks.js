import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getRecipes = createAsyncThunk("recipes/fetchAll", async () => {
  const result = await axios.get("http://localhost:31700/api/Recipe", {
    headers: {},
    params: {},
  });
  return result.data;
});
