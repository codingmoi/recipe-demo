import React from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { EntityState } from "../../common/entity-state";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export const Instructions = ({ instructions, onAdd, onChange, onRemove }) => {
  let step = 1;
  return (
    <Container className="pt-3">
      <Row>
        <Col>
          <h5>Instructions</h5>
          <Table striped bordered hover>
            <tbody>
              {instructions.map((instruction, index) => {
                if (instruction.state === EntityState.Deleted) return null;
                return (
                  <tr key={index}>
                    {/* <td>{instruction.id}</td> */}
                    <td>{`Step ${step++}`}</td>
                    <td>
                      <Form.Control
                        placeholder="Step Description"
                        as="textarea"
                        rows={4}
                        value={instructions[index].description}
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
            Add Instruction
          </Button>
        </Col>
      </Row>
    </Container>
  );
};
