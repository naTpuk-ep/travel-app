import React, { FC, useCallback, useEffect, useState } from "react";

interface ITime {
  date: string;
  month: string;
  year: string;
  hour: string;
  minute: string;
}

interface ITimeProps {
  timezone: string;
}

const Time: FC<ITimeProps> = ({ timezone }: ITimeProps) => {
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
    const date = addZero(timeOfZone.getDate());
    const month = addZero(timeOfZone.getMonth() + 1);
    const year = addZero(timeOfZone.getFullYear());
    return {
      hour,
      minute,
      date,
      month,
      year,
    };
  }, [timezone]);

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
  const { hour, minute, date, month, year } = time;
  return (
    <div className="time">
      <h5>{`Local time(${timezone}): ${hour}:${minute} ${date}-${month}-${year}`}</h5>
    </div>
  );
};

export default Time;
