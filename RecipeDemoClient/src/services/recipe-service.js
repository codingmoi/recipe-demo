import axios from "axios";

const recipeApiUrl = "http://localhost:52591/api/Recipe";

export const getRecipes = async () => {
  return await axios.get(recipeApiUrl);
};

export const getRecipeById = async (id) => {
  return await axios.get(`${recipeApiUrl}/${id}`);
};

export const createRecipe = async (recipe) => {
  return axios.post(recipeApiUrl, getFormData(recipe));
};

export const updateRecipe = async (recipe) => {
  return axios.put(recipeApiUrl, getFormData(recipe));
};

export const deleteRecipe = async (id) => {
  return await axios.delete(`${recipeApiUrl}/${id}`);
};

export const searchRecipe = async (value) => {
  return await axios.get(`${recipeApiUrl}/Search`, { params: { value } });
};

const getFormData = (recipe) => {
  const formData = new FormData();

  formData.append("id", recipe.id);
  formData.append("name", recipe.name);
  formData.append("description", recipe.description);
  formData.append("image", recipe.image.file);
  formData.append("fileName", recipe.image.fileName);
  formData.append("ingredients",  JSON.stringify(recipe.ingredients));
  formData.append("instructions", JSON.stringify(recipe.instructions));

  return formData;
};
