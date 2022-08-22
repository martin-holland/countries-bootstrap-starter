import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';

import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';

const Countries = () => {
  const [countries, setCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .catch((error) => {
        console.log(error);
      })
      .then((res) => {
        setCountries(res.data);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <Col className="text-center m-5">
        <Spinner
          animation="border"
          role="status"
          className="center"
          variant="info"
        >
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Col>
    );
  }

  return (
    <Container fluid>
      <Row>
        <Col className="mt-5 d-flex justify-content-center">
          <Form>
            <Form.Control
              style={{ width: '18rem' }}
              type="search"
              className="me-2 "
              placeholder="Search for countries"
              aria-label="Search"
              onChange={(e) => setSearch(e.target.value)}
            />
          </Form>
        </Col>
      </Row>
      <Row xs={2} md={3} lg={4} className=" g-3">
        {countries
          .filter((c) => {
            return c.name.official.toLowerCase().includes(search.toLowerCase());
          })
          .map((country) => (
            <Col className="mt-5">
              <Card key={country.name.official} className="h-100">
                <Card.Img
                  variant="top"
                  src={country.flags.svg}
                  className="rounded h-50"
                  style={{
                    objectFit: 'cover',
                    minHeight: '200px',
                    maxHeight: '200px',
                  }}
                />
                <Card.Body className="d-flex flex-column">
                  <Card.Title>{country.name.common}</Card.Title>
                  <Card.Subtitle className="mb-5 text-muted">
                    {country.name.official}
                  </Card.Subtitle>
                  <ListGroup
                    variant="flush"
                    className="flex-grow-1 justify-content-end"
                  >
                    <ListGroup.Item>
                      <i className="bi bi-translate me-2"></i>

                      {Object.values(country.languages || {}).join(', ')}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <i className="bi bi-cash-coin me-2"></i>

                      {Object.values(country.currencies || {})
                        .map((currency) => currency.name)
                        .join(', ')}
                    </ListGroup.Item>

                    <ListGroup.Item>
                      <i className="bi bi-people me-2"></i>
                      {country.population}
                    </ListGroup.Item>
                  </ListGroup>
                </Card.Body>
              </Card>
            </Col>
          ))}
      </Row>
    </Container>
  );
};

export default Countries;
