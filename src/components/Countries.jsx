import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  initializeCountries,
  search
} from '../features/countries/countriesSlice';
import { addFavourite } from '../features/countries/favouritesSlice';

import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import Spinner from 'react-bootstrap/Spinner';
import { LinkContainer } from 'react-router-bootstrap';

const Countries = () => {
  const dispatch = useDispatch();

  const countriesList = useSelector((state) => state.countries.countries);
  const loading = useSelector((state) => state.countries.isLoading);
  const searchInput = useSelector((state) => state.countries.search);

  useEffect(() => {
    dispatch(initializeCountries());
  }, [dispatch]);

  if (loading) {
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
              /*onChange={(e) => setSearch(e.target.value)}*/
              onChange={(e) => dispatch(search(e.target.value))}
            />
          </Form>
        </Col>
      </Row>
      <Row xs={2} md={3} lg={4} className=" g-3">
        {countriesList
          .filter((c) => {
            return c.name.official
              .toLowerCase()
              .includes(searchInput.toLowerCase());
          })
          .map((country) => (
            <Col className="mt-5" key={country.name.official}>
              <LinkContainer
                to={`/countries/${country.name.common}`}
                state={{ country: country }}
              >
                <Card className="h-100">
                  <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                <i class="bi bi-heart-fill text-danger m-1 p-1" onClick={() => dispatch(addFavourite(country.name.common))}></i>
                </div>
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
              </LinkContainer>
            </Col>
          ))}
      </Row>
    </Container>
  );
};

export default Countries;
