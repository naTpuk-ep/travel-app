/* eslint-disable no-console */
import React, { FC, useContext } from "react";
import { Card } from "react-bootstrap";
import LocalizationContext from "../../context/LocalizationContext";
import ICountryData from "../../models/country-data";
import Time from "../Time";
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
      <Card className="bg-dark text-white">
        <Card.Img src={imageUrl} alt="Card image" />
        <Card.ImgOverlay>
          <Card.Title>{`${name}`}</Card.Title>
          <img className="flag" src={flag} alt={name} />
          <Card.Text>{capital}</Card.Text>
          <Card.Text>{description}</Card.Text>
          <Time timezone={timezones[0]} />
        </Card.ImgOverlay>
      </Card>
    </div>
  );
};

export default CountryDescription;
