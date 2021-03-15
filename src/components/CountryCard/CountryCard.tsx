import React, { useContext } from "react";
import { Card } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import routes from "../../constants/routes";
import LocalizationContext from "../../context/LocalizationContext";
import ICountryData from "../../models/country-data";
import LOCALIZATIONS from "../../assets/data/localizations";
import "./CountryCard.scss";

interface ICountryCardProps {
  countryData: ICountryData;
}

const CountryCard: React.FunctionComponent<ICountryCardProps> = (
  props: ICountryCardProps
) => {
  const { countryData } = props;
  const language = useContext(LocalizationContext);

  return (
    <LinkContainer
      // eslint-disable-next-line no-underscore-dangle
      to={`${routes.HOME}country/${countryData._id}`}
      className="country-card"
    >
      <Card bg="light">
        <Card.Img
          className="country-card__img"
          variant="top"
          src={countryData.imageUrl}
        />
        <Card.Body>
          <Card.Title className="country-card__flag-img">
            <img src={countryData.flag} alt="flag" />
          </Card.Title>
          <Card.Title>{countryData.localizations[language].name}</Card.Title>
          <Card.Text>{countryData.localizations[language].capital}</Card.Text>
        </Card.Body>
        <Card.Footer>
          <small className="text-muted">
            {LOCALIZATIONS.main.countryCard.footer[language]}
          </small>
        </Card.Footer>
      </Card>
    </LinkContainer>
  );
};

export default CountryCard;
