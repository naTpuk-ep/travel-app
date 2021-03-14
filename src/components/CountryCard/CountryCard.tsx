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
      to={`${routes.HOME}${countryData._id}`}
      className="country-card"
    >
      <Card>
        <div className="country-card__img">
          <Card.Img variant="top" src={countryData.imageUrl} />
        </div>
        <Card.Body>
          <Card.Title>{countryData.localizations[language].name}</Card.Title>
          <Card.Text>
            {countryData.localizations[language].description}
          </Card.Text>
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
