import axios from "axios";
import React, { FC, useEffect, useMemo, useState } from "react";
import Loader from "../Loader";
import "./Weather.scss";

interface IWeatherProps {
  city: string | undefined;
}

interface IWeatherData {
  temp: number;
  icon: string;
  description: string;
}

const Weather: FC<IWeatherProps> = ({ city }: IWeatherProps) => {
  const [data, setData] = useState<IWeatherData | undefined>();
  const APIKey = "ce37a86730058fe8d88e2bd624a9e06f";
  const weatherAPI = useMemo(
    () =>
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=en&appid=${APIKey}&units=metric`,
    [city]
  );

  useEffect(() => {
    const getWeather = async () => {
      try {
        const res = await axios.get(weatherAPI);
        setData({
          temp: Math.round(res.data.main.temp),
          icon: `owf owf-${res.data.weather[0].id}-d owf-3x`,
          description: res.data.weather[0].description,
        });
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e.message);
      }
    };
    getWeather();
  }, [weatherAPI]);

  return data ? (
    <div className="weather">
      <h2 className="weather__temperature" id="temp">
        {data.temp} °C
      </h2>
      <i className={data.icon} />
    </div>
  ) : (
    <Loader />
  );
};

export default Weather;
