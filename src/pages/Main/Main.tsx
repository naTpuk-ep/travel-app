import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import CountryCard from "../../components/CountryCard";
import Loader from "../../components/Loader";
import LocalizationContext from "../../context/LocalizationContext";
import ICountryData from "../../models/country-data";
import "./Main.scss";

interface IMainProps {
  search: string;
}

const Main: React.FunctionComponent<IMainProps> = ({ search }: IMainProps) => {
  const language = useContext(LocalizationContext);
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
    <>
      {isLoad ? (
        <div className="main-page">
          {countriesData
            .filter((item) => {
              const text = search.toLocaleLowerCase();
              const name = item.localizations[
                language
              ].name.toLocaleLowerCase();
              const capital = item.localizations[
                language
              ].capital.toLocaleLowerCase();

              if (name.includes(text) || capital.includes(text)) return true;

              return false;
            })
            .map((country) => {
              // eslint-disable-next-line no-underscore-dangle
              return <CountryCard key={country._id} countryData={country} />;
            })}
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default Main;
