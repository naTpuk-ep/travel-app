import React from "react";
import { Card } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import routes from "../../constants/routes";
import ICountryData from "../../models/country-data";
import "./CountryCard.scss";

interface ICountryCardProps {
  countryData: ICountryData;
}

const CountryCard: React.FunctionComponent<ICountryCardProps> = (
  props: ICountryCardProps
) => {
  const { countryData } = props;

  return (
    <LinkContainer
      // eslint-disable-next-line no-underscore-dangle
      to={`${routes.HOME}${countryData._id}`}
      className="country-card"
    >
      <Card>
        <div className="country-card__img">
          <Card.Img variant="top" src={countryData.imageUrl} />
        </div>
        <Card.Body>
          <Card.Title>{countryData.localizations.en.name}</Card.Title>
          <Card.Text>{countryData.localizations.en.description}</Card.Text>
        </Card.Body>
        <Card.Footer>
          <small className="text-muted">Click to learn more</small>
        </Card.Footer>
      </Card>
    </LinkContainer>
  );
};

export default CountryCard;
