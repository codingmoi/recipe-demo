import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import Stack from "react-bootstrap/Stack";
import { Ingredients } from "../ingredients/ingredients";
import * as recipeService from "../../services/recipe-service";
import { Instructions } from "../instructions/instructions";

export const RecipeNew = () => {
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState({ url: null, file: null });
  const [ingredientList, setIngredientList] = useState([
    { id: 0, description: "" },
  ]);
  const [instructionList, setInstructionList] = useState([
    { id: 0, description: "" },
  ]);

  const onImageChange = (event) => {
    const imageFile = event.target.files[0];
    const imageUrl = URL.createObjectURL(imageFile);
    setImage({ url: imageUrl, file: imageFile });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      recipeService
      .createRecipe({
        id: 0,
        name,
        description,
        image,
        ingredients: ingredientList,
        instructions: instructionList,
      })
      .then((response) => {
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
    }    
    setValidated(true);
  };

  const onCancel = () => {
    navigate("/");
  };

  const onAddIngredient = () => {
    const addIngredients = [...ingredientList];
    addIngredients.push({ id: 0, description: "" });
    setIngredientList(addIngredients);
  };

  const onChangeIngredient = (index, value) => {
    const modifyIngredients = [...ingredientList];
    modifyIngredients[index].description = value;
    setIngredientList(modifyIngredients);
  };

  const onRemoveIngredient = (index) => {
    if (ingredientList.length > 1) {
      const removeIngredients = [...ingredientList];
      removeIngredients.splice(index, 1);
      setIngredientList(removeIngredients);
    }
  };

  const onAddInstruction = () => {
    const addInstructions = [...instructionList];
    addInstructions.push({
      id: 0,
      description: "",
    });
    setInstructionList(addInstructions);
  };

  const onChangeInstruction = (index, value) => {
    const modifyInstructions = [...instructionList];
    modifyInstructions[index].description = value;
    setInstructionList(modifyInstructions);
  };

  const onRemoveInstruction = (index) => {
    if (instructionList.length > 1) {
      const removeInstructions = [...instructionList];
      removeInstructions.splice(index, 1);
      setInstructionList(removeInstructions);
    }
  };

  return (
    <>
      <h3>New Recipe</h3>
      <Form noValidate validated={validated} onSubmit={onSubmit}>
        <Form.Group className="mb-3" controlId="recipeName">
          <Form.Label>Recipe Name</Form.Label>
          <Form.Control
            required
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          <Form.Control.Feedback type="invalid">
            Please provide a Recipe Name.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="recipeDescription">
          <Form.Label>Recipe Description</Form.Label>
          <Form.Control
            required
            as="textarea"
            rows={2}
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
          <Form.Control.Feedback type="invalid">
            Please provide a Recipe Description.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="recipeDescription">
          <Image src={image.url} className="p-2" width={150} height={150} />
          <Form.Control type="file" accept="image/*" onChange={onImageChange} />
        </Form.Group>
        <Ingredients
          onAdd={onAddIngredient}
          onChange={onChangeIngredient}
          onRemove={onRemoveIngredient}
          ingredients={ingredientList}
        />
        <Instructions
          onAdd={onAddInstruction}
          onChange={onChangeInstruction}
          onRemove={onRemoveInstruction}
          instructions={instructionList}
        />
        <Stack className="pt-4" direction="horizontal" gap={2}>
          <Button variant="primary" type="submit">
            Save
          </Button>
          <Button variant="secondary" type="button" onClick={onCancel}>
            Cancel
          </Button>
        </Stack>
      </Form>
    </>
  );
};
