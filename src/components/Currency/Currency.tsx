/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-console */
import axios from "axios";
import React, { FC, useCallback, useEffect, useState } from "react";
import CurrencyConverts from "../../constants/currencyConverts";
import Loader from "../Loader";
import "./Currency.scss";

interface ICurrencies {
  [key: string]: number;
}

interface IcurrencyProps {
  localCurrency: string | undefined;
}

const Currency: FC<IcurrencyProps> = ({ localCurrency }: IcurrencyProps) => {
  const [displayRates, setDisplayRates] = useState<ICurrencies>();
  const [error, setError] = useState<string | null>();

  const roundRatesValues = (value: number) => {
    let roundCoefficient = 100;
    if (value < 0.1) {
      roundCoefficient = 10 ** (Math.ceil(1 / value).toString().length + 1);
    }
    return Math.round(value * roundCoefficient) / roundCoefficient;
  };

  const selectRates = useCallback((rates: ICurrencies, base: string) => {
    const selectedRates = Object.assign(rates, {});
    Object.keys(selectedRates).forEach((key: string) => {
      selectedRates[key] = roundRatesValues(selectedRates[key]);
      if (!(key in CurrencyConverts) || key === base) {
        delete selectedRates[key];
      }
    });
    return selectedRates;
  }, []);

  useEffect(() => {
    const getRates = async (base: string) => {
      const data = await axios
        .get(`https://api.exchangeratesapi.io/latest?base=${base}`)
        .then((response) => response.data)
        .catch(() => {
          setError("Error loading currency information");
        });
      if (data) {
        const { rates } = data;
        const selectedRates = selectRates(rates, base);
        setDisplayRates(selectedRates);
      }
    };
    if (localCurrency) {
      getRates(localCurrency);
    } else {
      setError("Error loading currency information");
    }
  }, [localCurrency, selectRates]);
  return (
    <div className="currency">
      {displayRates ? (
        <>
          <h5>{`Local currency: ${localCurrency}`}</h5>
          {Object.keys(displayRates).map((key: string, i: number) => (
            <div className="currency__item" key={i}>
              <span>{`1 ${localCurrency}`}</span>
              <span>=</span>
              <span>{`${displayRates[key]} ${key}`}</span>
            </div>
          ))}
        </>
      ) : error ? (
        <h6 className="error">{error}</h6>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default Currency;
