import React, { FC, useCallback, useContext, useEffect, useState } from "react";
import LOCALIZATIONS from "../../assets/data/localizations";
import LocalizationContext from "../../context/LocalizationContext";
import ITime from "../../models/time";
import "./Time.scss";

interface ITimeProps {
  timezone: string;
}

const Time: FC<ITimeProps> = ({ timezone }: ITimeProps) => {
  const language = useContext(LocalizationContext);
  const addZero = (number: number) => `${number < 10 ? "0" : ""}${number}`;
  const clockTimeZone = useCallback(() => {
    const timeZoneValues = timezone.match(/^(?:UTC\+)(\d{2})/);
    const timezoneOffset = +(timeZoneValues ? timeZoneValues[1] : 0);
    const localTime = new Date();
    const ms =
      localTime.getTime() +
      localTime.getTimezoneOffset() * 60000 +
      timezoneOffset * 3600000;
    const timeOfZone = new Date(ms);

    const hour = addZero(timeOfZone.getHours());
    const minute = addZero(timeOfZone.getMinutes());
    const second = addZero(timeOfZone.getSeconds());
    const date = addZero(timeOfZone.getDate());
    const month = LOCALIZATIONS.time.months[language][timeOfZone.getMonth()];
    const day = LOCALIZATIONS.time.days[language][timeOfZone.getDay() - 1];
    return {
      hour,
      minute,
      date,
      month,
      day,
      second,
    };
  }, [language, timezone]);

  const [time, setTime] = useState<ITime>(clockTimeZone());

  useEffect(() => {
    let timeOut: NodeJS.Timeout;
    const getTime = () => {
      setTime(clockTimeZone());
      timeOut = setTimeout(getTime, 1000);
    };
    getTime();
    return () => {
      clearTimeout(timeOut);
    };
  }, [clockTimeZone]);

  const { hour, minute, date, month, day, second } = time;
  return (
    <div className="time">
      <h6>{`${date} ${month} ${day}`}</h6>
      <h2>{`${hour}:${minute}:${second}`}</h2>
    </div>
  );
};

export default Time;
