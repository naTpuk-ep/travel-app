import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ICountryData from "../../models/country-data";
import Loader from "../../components/Loader";
import CountryDescription from "../../components/CountryDescription";
import PhotoGallery from "../../components/PhotoGallery";
import Video from "../../components/Video";


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
    <>
      {isLoad ? (
        <div className="country-page">
          <CountryDescription countryData={countryData} />
          <PhotoGallery countryId={countryId} />
          <Video url={countryData?.videoUrl} />
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default CountryPage;
