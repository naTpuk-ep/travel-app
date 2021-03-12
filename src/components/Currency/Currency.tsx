/* eslint-disable react/no-array-index-key */
/* eslint-disable no-console */
import axios from "axios";
import React, { FC, useEffect, useState } from "react";

enum ConvertsTo {
  USD = "USD",
  EUR = "EUR",
  RUB = "RUB",
}

interface ICurrencies {
  [key: string]: number;
}

const Currency: FC = () => {
  const localCurrency = "GBP"; // from props
  const [currencies, setCurrencies] = useState<ICurrencies>();
  console.log(currencies);

  useEffect(() => {
    const getCurrencies = async (base: string) => {
      const res = await axios.get(
        `https://api.exchangeratesapi.io/latest?base=${base}`
      );
      const { rates } = res.data;
      Object.keys(rates).forEach((key: string) => {
        rates[key] = Math.round(rates[key] * 100) / 100;
        if (!(key in ConvertsTo) || key === base) {
          delete rates[key];
        }
      });
      setCurrencies(rates);
    };
    getCurrencies(localCurrency);
  }, []);
  return currencies ? (
    <div className="currency">
      <h4>{`Local currency: ${localCurrency}`}</h4>
      {Object.keys(currencies).map((key: string, i: number) => (
        <h5 key={i}>{`1${localCurrency} = ${currencies[key]}${key}`}</h5>
      ))}
    </div>
  ) : (
    <h5>LOADING CURRENCY...</h5>
  );
};

export default Currency;
