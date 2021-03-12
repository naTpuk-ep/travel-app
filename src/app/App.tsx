import * as React from "react";
import { Route, Switch, useParams } from "react-router-dom";
import routes from "../constants/routes";
import "./App.scss";
import Main from "../pages/Main";
import Header from "../components/Header";

interface ICountryPageParams {
  countryId: string;
}

const CountryPage: React.FunctionComponent = () => {
  const { countryId } = useParams<ICountryPageParams>();

  return <h1>Country: {countryId}</h1>;
};

const App: React.FunctionComponent = () => {
  return (
    <>
      <header>
        <Header />
      </header>
      <main>
        <Switch>
          <Route exact path={routes.HOME}>
            <Main />
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
