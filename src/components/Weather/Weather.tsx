import axios from "axios";
import React, { createRef, FC, useContext, useEffect, useState } from "react";
// import ReactWeather, { useOpenWeather } from "react-open-weather";
import LocalizationContext from "../../context/LocalizationContext";
import ICountryData from "../../models/country-data";
import Loader from "../Loader";
import "./Weather.scss";

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
}

const Weather: FC<IWeatherProps> = ({ countryData }: IWeatherProps) => {
  const language = useContext(LocalizationContext);
  const APIKey = "ce37a86730058fe8d88e2bd624a9e06f";
  const [weatherData, setWeatherData] = useState<IWeatherData | undefined>();
  // const weatherData = useOpenWeather({
  //   key: APIKey,
  //   lat: countryData?.capitalLocation.coordinates[0],
  //   lon: countryData?.capitalLocation.coordinates[1],
  //   lang: language,
  //   unit: "metric",
  // });
  // const { data, isLoading, errorMessage } = weatherData;
  // const customStyles = {
  //   fontFamily: "Helvetica, sans-serif",
  //   gradientStart: "white",
  //   gradientMid: "white",
  //   gradientEnd: "white",
  //   locationFontColor: "black",
  //   todayTempFontColor: "black",
  //   todayDateFontColor: "black",
  //   todayRangeFontColor: "black",
  //   todayDescFontColor: "black",
  //   todayInfoFontColor: "black",
  //   todayIconColor: "black",
  // };
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

  useEffect(() => {
    const getWeather = async () => {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${countryData?.localizations[language].capital}&lang=${language}&appid=${APIKey}&units=metric`
      );
      const {
        main: { temp, humidity },
        weather: [{ id }],
        wind,
      } = res.data;
      setWeatherData({
        temp,
        humidity,
        id,
        wind,
      });
    };

    getWeather();
  }, [countryData, language]);

  console.log(weatherData ?? "noWdata");

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
    <div
      ref={weatherRef}
      role="button"
      tabIndex={0}
      onClick={clickHandler}
      className={`weather ${minimized}`}
    >
      {/* <ReactWeather
        isLoading={isLoading}
        errorMessage={errorMessage}
        data={data}
        lang={language}
        locationLabel={countryData?.localizations.en.capital}
        unitsLabels={{ temperature: "℃", windSpeed: "Km/h" }}
        showForecast={false}
        theme={customStyles}
      /> */}
      {weatherData ? (
        <>
          <div className="weather__left">
            <h3>{weatherData.temp}</h3>
            <br />
            {/* <p>{weatherData.de}</p> */}
          </div>
          <div className="weather__icon">
            <i className={`owf owf-${weatherData.id}-d owf-5x`} />
          </div>
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default Weather;
