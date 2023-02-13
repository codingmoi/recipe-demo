import React from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { EntityState } from "../../common/entity-state";

export const Ingredients = ({ ingredients, onAdd, onChange, onRemove }) => {
  return (
    <Container className="pt-3">
      <Row>
        <Col>
          <h5>Ingredients</h5>
          <Table striped bordered hover>
            <tbody>
              {ingredients.map((ingredient, index) => {
                if (ingredient.state === EntityState.Deleted) return null;
                return (
                  <tr key={index}>
                    {/* <td>{ingredient.id}</td> */}
                    <td>
                      <Form.Control
                        placeholder="Ingredient Description"
                        type="text"
                        value={ingredients[index].description}
                        onChange={(event) =>
                          onChange(index, event.target.value)
                        }
                      />
                    </td>
                    <td>
                      <Button variant="link" onClick={() => onRemove(index)}>
                        Delete
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Col>
      </Row>
      <Row>
        <Col>
          <Button variant="link" onClick={onAdd}>
            Add Ingredient
          </Button>
        </Col>
      </Row>
    </Container>
  );
};
