import React from "react";
import { useParams } from "react-router-dom";
import { Container } from "react-bootstrap";

interface ICountryPageParams {
  countryId: string;
}

const CountryPage: React.FunctionComponent = () => {
  const { countryId } = useParams<ICountryPageParams>();

  return (
    <Container className="country-page">
      <h1>Country: {countryId}</h1>
    </Container>
  );
};

export default CountryPage;
