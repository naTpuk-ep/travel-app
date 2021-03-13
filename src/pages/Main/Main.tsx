import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import CountryCard from "../../components/CountryCard";
import Loader from "../../components/Loader";
import ICountryData from "../../models/country-data";
import "./Main.scss";

const Main: React.FunctionComponent = () => {
  const [isLoad, setIsLoad] = useState(false);
  const [countriesData, setCountriesData] = useState<ICountryData[]>([]);

  useEffect(() => {
    const getCountriesData = async () => {
      const result = await axios(
        "https://rnovikov-travel-app-backend.herokuapp.com/countries"
      );

      setCountriesData(result.data);
      setIsLoad(true);
    };

    getCountriesData();
  }, []);

  return (
    <Container>
      {isLoad ? (
        countriesData.map((country) => {
          // eslint-disable-next-line no-underscore-dangle
          return <CountryCard key={country._id} countryData={country} />;
        })
      ) : (
        <Loader />
      )}
    </Container>
  );
};

export default Main;
