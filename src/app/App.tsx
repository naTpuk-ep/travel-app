import * as React from "react";
import { Route, Switch, useParams } from "react-router-dom";
import routes from "../constants/routes";
import "./App.scss";
import CountryDescription from "./Components/Description";

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
      <CountryDescription />
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
