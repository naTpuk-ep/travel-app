import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container } from "react-bootstrap";
import axios from "axios";
import ICountryData from "../../models/country-data";
import Loader from "../../components/Loader";

interface ICountryPageParams {
  countryId: string;
}

const CountryPage: React.FunctionComponent = () => {
  const { countryId } = useParams<ICountryPageParams>();
  const [isLoad, setIsLoad] = useState(false);
  const [countryData, setCountryData] = useState<ICountryData>();

  useEffect(() => {
    const getCountriesData = async () => {
      const result = await axios(
        `https://rnovikov-travel-app-backend.herokuapp.com/countries/${countryId}`
      );

      setCountryData(result.data[0]);
      setIsLoad(true);
    };

    getCountriesData();
  }, [countryId]);

  return (
    <Container className="country-page">
      {isLoad ? (
        <h1>Country: {countryData?.localizations.en.name}</h1>
      ) : (
        <Loader />
      )}
    </Container>
  );
};

export default CountryPage;
