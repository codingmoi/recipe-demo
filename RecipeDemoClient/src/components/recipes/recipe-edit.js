import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import Stack from "react-bootstrap/Stack";
import * as recipeService from "../../services/recipe-service";
import { Ingredients } from "../ingredients/ingredients";
import { Instructions } from "../instructions/instructions";
import { EntityState } from "../../common/entity-state";

export const RecipeEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState({ url: null, fileName: "", file: null });
  const [ingredientList, setIngredientList] = useState([
    { id: 0, description: "" },
  ]);
  const [instructionList, setInstructionList] = useState([
    { id: 0, description: "" },
  ]);
  const mounted = useRef(false);

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      recipeService
        .getRecipeById(id)
        .then((response) => {
          const recipe = response.data;

          setName(recipe.name);
          setDescription(recipe.description);

          if (recipe.fileName) {
            setImage({
              url: `${process.env.PUBLIC_URL}/${recipe.fileName}`,
              fileName: recipe.fileName,
            });
          }

          if (recipe.ingredients.length > 0) {
            setIngredientList(recipe.ingredients);
          }

          if (recipe.instructions.length > 0) {
            setInstructionList(recipe.instructions);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

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
        .updateRecipe({
          id,
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
    addIngredients.push({ id: 0, description: "", state: EntityState.Added });
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
      removeIngredients[index].state = EntityState.Deleted;
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
      removeInstructions[index].state = EntityState.Deleted;
      setInstructionList(removeInstructions);
    }
  };

  return (
    <>
      <h3>Edit Recipe</h3>
      <Form noValidate validated={validated} onSubmit={onSubmit}>
        <Form.Group className="mb-3">
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
        <Form.Group className="mb-3">
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
        <Form.Group className="mb-3">
          <Image src={image.url} className="p-2" width={150} height={150} />
          <span>{image.fileName}</span>
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
