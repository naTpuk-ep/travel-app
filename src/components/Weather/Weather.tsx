import React, { createRef, FC, useContext, useEffect, useState } from "react";
import ReactWeather, { useOpenWeather } from "react-open-weather";
import LocalizationContext from "../../context/LocalizationContext";
import ICountryData from "../../models/country-data";
import "./Weather.scss";

interface IWeatherProps {
  countryData: ICountryData | undefined;
}

const Weather: FC<IWeatherProps> = ({ countryData }: IWeatherProps) => {
  const language = useContext(LocalizationContext);
  const APIKey = "ce37a86730058fe8d88e2bd624a9e06f";
  const { data, isLoading, errorMessage } = useOpenWeather({
    key: APIKey,
    lat: countryData?.capitalLocation.coordinates[0],
    lon: countryData?.capitalLocation.coordinates[1],
    lang: language,
    unit: "metric",
  });
  const customStyles = {
    fontFamily: "Helvetica, sans-serif",
    gradientStart: "white",
    gradientMid: "white",
    gradientEnd: "white",
    locationFontColor: "black",
    todayTempFontColor: "black",
    todayDateFontColor: "black",
    todayRangeFontColor: "black",
    todayDescFontColor: "black",
    todayInfoFontColor: "black",
    todayIconColor: "black",
  };
  const [minimized, setMinimized] = useState("minimized");
  const clickHandler = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ): void => {
    event.stopPropagation();
    setMinimized("");
  };
  const weatherRef = createRef<HTMLDivElement>();

  useEffect(() => {
    const closeWidgetes = () => {
      if (weatherRef.current) {
        setMinimized("minimized");
      }
    };
    window.addEventListener("click", closeWidgetes);
    return () => window.removeEventListener("click", closeWidgetes);
  });

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
    <div
      ref={weatherRef}
      role="button"
      tabIndex={0}
      onClick={clickHandler}
      className={`weather ${minimized}`}
    >
      <ReactWeather
        isLoading={isLoading}
        errorMessage={errorMessage}
        data={data}
        lang={language}
        locationLabel={countryData?.localizations.en.capital}
        unitsLabels={{ temperature: "℃", windSpeed: "Km/h" }}
        showForecast={false}
        theme={customStyles}
      />
    </div>
  );
};

export default Weather;
