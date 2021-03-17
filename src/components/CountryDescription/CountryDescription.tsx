/* eslint-disable no-console */
import React, { FC, useContext } from "react";
import { Card } from "react-bootstrap";
import LocalizationContext from "../../context/LocalizationContext";
import ICountryData from "../../models/country-data";
import Currency from "../Currency";
import Time from "../Time";
import Weather from "../Weather";
import "./CountryDescription.scss";

interface ICountryDescriptionProps {
  countryData: ICountryData | undefined;
}

const CountryDescription: FC<ICountryDescriptionProps> = ({
  countryData,
}: ICountryDescriptionProps) => {
  const language = useContext(LocalizationContext);

  const {
    flag,
    imageUrl,
    localizations: {
      [language]: { capital, name, description },
    },
    timezones,
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  } = countryData!;

  return (
    <div className="description">
      <Card bg="light">
        <Card.Img variant="top" src={imageUrl} alt={name} />
        <Card.ImgOverlay>
          <div className="widgetes-container">
            <Weather countryData={countryData} />
            <Currency localCurrency={countryData?.currency} />
            <Time timezone={timezones[0]} />
          </div>
        </Card.ImgOverlay>
      </Card>
      <Card bg="light">
        <Card.Body>
          <Card.Title>{`${name}`}</Card.Title>
          <img className="flag" src={flag} alt={name} />
          <Card.Text>{capital}</Card.Text>
          <Card.Text>{description}</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default CountryDescription;
