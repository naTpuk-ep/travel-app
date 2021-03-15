import React, { FC } from "react";
import ReactWeather, { useOpenWeather } from "react-open-weather";
import ICountryData from "../../models/country-data";
import "./Weather.scss";

interface IWeatherProps {
  countryData: ICountryData | undefined;
}

const Weather: FC<IWeatherProps> = ({ countryData }: IWeatherProps) => {
  const APIKey = "ce37a86730058fe8d88e2bd624a9e06f";
  const { data, isLoading, errorMessage } = useOpenWeather({
    key: APIKey,
    lat: countryData?.capitalLocation.coordinates[0],
    lon: countryData?.capitalLocation.coordinates[1],
    lang: "en",
    unit: "metric",
  });
  return (
    <div className="weather">
      <ReactWeather
        isLoading={isLoading}
        errorMessage={errorMessage}
        data={data}
        lang="en"
        locationLabel={countryData?.localizations.en.capital}
        unitsLabels={{ temperature: "C", windSpeed: "Km/h" }}
        showForecast={false}
      />
    </div>
  );
};

export default Weather;
