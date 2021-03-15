/* eslint-disable no-console */
import React, { FC, useContext } from "react";
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
      <img className="description__img" src={imageUrl} alt={name} />
      <div className="description__country">
        <img className="description__flag" src={flag} alt={name} />
        <h1 className="description__name">{name}</h1>
      </div>
      <div className="description__capital">
        <h2 className="description__capital__name">{`Capital: ${capital}`}</h2>
        <Time timezone={timezones[0]} />
      </div>
      <p className="description__info">{description}</p>
    </div>
  );
};

export default CountryDescription;
