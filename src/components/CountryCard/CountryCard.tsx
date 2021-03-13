import React from "react";
import { Link } from "react-router-dom";
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
    // eslint-disable-next-line no-underscore-dangle
    <Link to={`${routes.HOME}country/${countryData._id}`}>
      {countryData.localizations.en.name}
    </Link>
  );
};

export default CountryCard;
