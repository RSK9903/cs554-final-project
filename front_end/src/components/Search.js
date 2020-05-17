import React from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';

const Search = (props) => {
  const handleChange = (e) => {
    props.searchValue(e.target.value);
  };
  return (
    <Container>
      <Row>
        <Col>
          <Form method="POST " name="formName" style={{ marginTop: '5%' }}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Search Recipes</Form.Label>
              <Form.Control type="text" name="searchTerm" onChange={handleChange} />
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Search;
