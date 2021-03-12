import * as React from "react";
import { Route, Switch, useParams } from "react-router-dom";
import Currency from "../components/Currency/Currency";
import routes from "../constants/routes";
import "./App.scss";

const MainPage: React.FunctionComponent = () => {
  return <h1>Home</h1>;
};

interface ICountryPageParams {
  countryId: string;
}

const CountryPage: React.FunctionComponent = () => {
  const { countryId } = useParams<ICountryPageParams>();

  return (
    <>
      <h1>Country: {countryId}</h1>
      <Currency />
    </>
  );
};

const App: React.FunctionComponent = () => {
  return (
    <>
      {/* <header></header> */}
      <main>
        <Switch>
          <Route exact path={routes.HOME}>
            <MainPage />
          </Route>
          <Route path={routes.COUNTRY}>
            <CountryPage />
          </Route>
        </Switch>
      </main>
      {/* <footer></footer> */}
    </>
  );
};

export default App;
