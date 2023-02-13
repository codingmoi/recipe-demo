import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Modal from "react-bootstrap/Modal";
import Spinner from 'react-bootstrap/Spinner';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import * as recipeService from "../../services/recipe-service";
import "./recipe-list.scss";

export const RecipeList = () => {
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [deleteModal, setDeleteModal] = useState({ show: false, recipe: null });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timeoutId = setTimeout(() => {      
      recipeService
        .searchRecipe(search)
        .then((response) => {
          setRecipes(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    }, 700);
    return () => clearTimeout(timeoutId);
  }, [search]);

  const onNewRecipe = () => {
    navigate("/new");
  };

  const onDeleteRecipe = (recipe) => {
    setDeleteModal({ show: true, recipe });
  };

  const onDeleteModalClose = () => {
    setDeleteModal({ show: false, recipe: null });
  };

  const onDeleteConfirmed = () => {
    recipeService
      .deleteRecipe(deleteModal.recipe.id)
      .then(() => {
        setDeleteModal({ show: false, recipe: null });        
        recipeService
          .getRecipes()
          .then((response) => {
            setRecipes(response.data);
            setLoading(false);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onSearchChange = (value) => {
    setSearch(value);
  };  

  const populateRows = () => {
    if (loading) {
      return <tr className="text-center"><td colSpan={4}><Spinner animation="border" /></td></tr>;
    } else if (recipes.length === 0) {
       return <tr className="text-center"><td colSpan={4}>No Results Found</td></tr>;
    }
    return recipes.map((recipe) => {
      return (
        <tr key={recipe.id}>
          {/* <td>{recipe.id}</td> */}
          <td>{recipe.name}</td>
          <td>{recipe.description}</td>
          <td>
            <Link to={`/edit/${recipe.id}`} className="mr-edit">
              View/Edit
            </Link>
            <Link onClick={() => onDeleteRecipe(recipe)}>Delete</Link>
          </td>
        </tr>
      );
    });
  }

  return (
    <>
      <h3>Recipes List</h3>
      <InputGroup className="mb-3">
        <Form.Control
          placeholder="Search Recipes By Name, Description, Ingredient, Instructions"
          aria-label="Search Recipes"
          aria-describedby="basic-addon2"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
        ></Form.Control>
        {search && (
          <Button variant="secondary" onClick={() => onSearchChange("")}>
            Clear
          </Button>
        )}
      </InputGroup>
      <Button className="mb-3" onClick={onNewRecipe}>
        New Recipe
      </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            {/* <th>Recipe Id</th> */}
            <th>Recipe Name</th>
            <th>Recipe Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {populateRows()}
        </tbody>
      </Table>
      <Modal show={deleteModal.show} onHide={onDeleteModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Recipe</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Do you want to delete recipe <b>{deleteModal.recipe?.name}</b>?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onDeleteModalClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={onDeleteConfirmed}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
