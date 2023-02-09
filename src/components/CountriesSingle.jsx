import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { Container, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Spinner from 'react-bootstrap/Spinner';

const CountriesSingle = () => {
  const location = useLocation();
  const country = location.state.country;
  const [weather, setWeather] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const countryTest = {
    capital: 'Helsinki'
  }

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${countryTest.capital}&units=metric&appid=${process.env.REACT_APP_OPENWEATHER_KEY}`
      )
      .catch((error) => {
        console.log(error);
        setError(true);
        setLoading(false);
      })
      .then((res) => {
        setWeather(res.data);
        setLoading(false);
      });
  }, [countryTest.capital]);

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
    <Container>
      <Row className="m-5">
        <Col>
          {' '}
          <Image
            thumbnail
            src={`https://source.unsplash.com/featured/1600x900?${country.capital}`}
          ></Image>
        </Col>
        <Col>
          <h2 className="display-4">{country.name.common}</h2>

          <h3>{country.capital}</h3>

          {!error && (
            <div>
              <p>
                Right now it is <strong>{parseInt(weather.main.temp)} </strong>
                degrees in {country.capital} and{' '}
                {weather.weather[0].description}
              </p>
              <img
                src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                alt={weather.weather[0].description}
              />
            </div>
          )}
        </Col>
      </Row>
      <Row className="m-5">
        <Col>
          {/* <Button variant="light" onClick={() => navigate(-1)}> */}
          <Button variant="light" onClick={() => navigate('/countries')}>
            Back to countries
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default CountriesSingle;
