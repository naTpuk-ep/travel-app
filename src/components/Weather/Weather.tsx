/* eslint-disable no-nested-ternary */
import axios from "axios";
import React, { createRef, FC, useContext, useEffect, useState } from "react";
import ICountryData from "../../models/country-data";
import Loader from "../Loader";
import "./Weather.scss";
import LOCALIZATIONS from "../../assets/data/localizations";
import LocalizationContext from "../../context/LocalizationContext";

interface IWeatherProps {
  countryData: ICountryData | undefined;
}

interface IWeatherData {
  temp: number;
  id: string;
  humidity: number;
  wind: {
    deg: number;
    speed: number;
  };
  description: string;
}

const Weather: FC<IWeatherProps> = ({ countryData }: IWeatherProps) => {
  const language = useContext(LocalizationContext);
  const APIKey = "ce37a86730058fe8d88e2bd624a9e06f";
  const [weatherData, setWeatherData] = useState<IWeatherData | undefined>();
  const [minimized, setMinimized] = useState("minimized");
  const [error, setError] = useState<string | undefined>();
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

  useEffect(() => {
    const getWeather = async () => {
      const res = await axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?q=${countryData?.localizations[language].capital}&lang=${language}&appid=${APIKey}&units=metric`
        )
        .then((response) => response)
        .catch(() => {
          setError("Error loading weather data");
        });
      if (res) {
        setError(undefined);
        const {
          main: { temp, humidity },
          weather: [{ id, description }],
          wind,
        } = res.data;
        setWeatherData({
          temp,
          humidity,
          id,
          wind,
          description,
        });
      }
    };

    getWeather();
  }, [countryData, language]);

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
    <div
      ref={weatherRef}
      role="button"
      tabIndex={0}
      onClick={clickHandler}
      className={`weather ${minimized}`}
    >
      {weatherData ? (
        <>
          <div className="weather__left">
            <h1>{`${Math.round(weatherData.temp)} ℃`} </h1>
            <p>{`${LOCALIZATIONS.weather.humidity[language]}: ${weatherData.humidity} %`}</p>
            <p>{`${LOCALIZATIONS.weather.windSpeed[language]}: ${weatherData.wind.speed} ${LOCALIZATIONS.weather.units[language]}`}</p>
            {/* <p>{weatherData.de}</p> */}
          </div>
          <div className="weather__right">
            <i className={`owf owf-${weatherData.id}-d owf-5x`} />
            <h4>{weatherData.description}</h4>
          </div>
        </>
      ) : error && !minimized ? (
        <p className="error">{error}</p>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default Weather;
