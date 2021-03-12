/* eslint-disable no-console */
import axios from "axios";
import React, { useEffect, useState } from "react";
import "./CountryDescription.scss";

interface ICountryDescription {
  name: string;
  flag: string;
  imageUrl: string;
  capital: string;
  description: string;
}

const CountryDescription: React.FC = () => {
  const [countryDesc, setCountryDesc] = useState<ICountryDescription>();

  useEffect(() => {
    const getCountries = async () => {
      const res = await axios.get(
        "https://rnovikov-travel-app-backend.herokuapp.com/countries"
      );
      const {
        flag,
        imageUrl,
        localizations: { capital, name, description },
      } = res.data[0];
      // взял первую для примера
      setCountryDesc({
        name,
        flag,
        imageUrl,
        capital,
        description,
      });
    };

    getCountries();
  }, []);

  return countryDesc ? (
    <div className="description">
      <img
        className="description__img"
        src={countryDesc?.imageUrl}
        alt={countryDesc?.name}
      />
      <div className="description__country">
        <img
          className="description__flag"
          src={countryDesc?.flag}
          alt={countryDesc?.name}
        />
        <h1 className="description__name">{countryDesc?.name}</h1>
      </div>
      <h2 className="description__capital">{`Capital: ${countryDesc?.capital}`}</h2>
      <p className="description__info">{countryDesc?.description}</p>
    </div>
  ) : (
    <div className="description">LOADING...</div>
  );
};

export default CountryDescription;
