/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-array-index-key */
import axios from "axios";
import React, {
  createRef,
  FC,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { Spinner } from "react-bootstrap";
import LOCALIZATIONS from "../../assets/data/localizations";
import CurrencyConverts from "../../constants/currencyConverts";
import LocalizationContext from "../../context/LocalizationContext";
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
  const language = useContext(LocalizationContext);

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
          setError("Error loading currency data");
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
      setError("Error loading currency data");
    }
  }, [localCurrency, selectRates]);

  const [minimized, setMinimized] = useState("minimized");
  const clickHandler = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ): void => {
    event.stopPropagation();
    setMinimized("");
  };
  const CurrRef = createRef<HTMLDivElement>();

  useEffect(() => {
    const closeWidgetes = () => {
      if (CurrRef.current) {
        setMinimized("minimized");
      }
    };
    window.addEventListener("click", closeWidgetes);
    return () => window.removeEventListener("click", closeWidgetes);
  });
  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
    <div
      ref={CurrRef}
      role="button"
      tabIndex={0}
      onClick={clickHandler}
      className={`currency ${minimized}`}
    >
      {displayRates ? (
        <>
          <h5>{`${LOCALIZATIONS.currency[language]}: ${localCurrency}`}</h5>
          {Object.keys(displayRates).map((key: string, i: number) => (
            <div className="currency__item" key={i}>
              <span>{`1 ${localCurrency}`}</span>
              <span>=</span>
              <span>{`${displayRates[key]} ${key}`}</span>
            </div>
          ))}
        </>
      ) : error && !minimized ? (
        <h6 className="error">{error}</h6>
      ) : (
        <div className="mini-loader">
          <Spinner animation="border" />
        </div>
      )}
    </div>
  );
};

export default Currency;
