import React from "react";
import { Routes, Route } from "react-router-dom";
import NotFound from "../components/not-found/not-found";
import { RecipeEdit } from "../components/recipes/recipe-edit";
import { RecipeNew } from "../components/recipes/recipe-new";
import { RecipeList } from "../components/recipes/recipe-list";
import { Layout } from "../components/layout/layout";

export const RecipeDemoRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<RecipeList />} />
        <Route path="/new" element={<RecipeNew />} />
        <Route path="/edit/:id" element={<RecipeEdit />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};
